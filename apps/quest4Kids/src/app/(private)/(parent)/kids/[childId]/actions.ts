"use server";

import { auth } from "@repo/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as yup from "yup";

type FormState = {
  errors: Error;
  success?: boolean;
  values?: {
    title?: string;
    description?: string;
    points?: number;
    status?: string;
  };
};

type Error = Map<string, string>;

export async function addTask(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const errors = new Map<string, string>();

  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    errors.set("common", "No authorization token found");
    return { errors };
  }

  const childId = formData.get("childId");
  if (!childId) {
    errors.set("common", "Child ID is required");
    return { errors };
  }

  const taskSchema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(20, "Title must be less than 20 characters"),
    description: yup
      .string()
      .required("Description is required")
      .max(50, "Description must be less than 50 characters"),
    points: yup
      .number()
      .required("Points are required")
      .positive("Points must be a positive number")
      .integer("Points must be an integer"),
    status: yup
      .string()
      .oneOf(["OPEN", "IN_PROGRESS", "DONE"], "Invalid status")
      .required("Status is required"),
  });

  const formValues = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    points: Number(formData.get("points")),
    status: formData.get("status") as string,
  };

  try {
    await taskSchema.validate(formValues, { abortEarly: false });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        errors.set(err.path || "common", err.message);
      });
      return { errors, values: formValues };
    }
  }

  try {
    const response = await fetch(
      `https://quest4kids-a7fd24f91954.herokuapp.com/kids/${childId}/task`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      },
    );

    if (!response.ok) {
      errors.set(
        "common",
        `HTTP error! status: ${response.status}, ${response.statusText}`,
      );
      return { errors };
    }

    revalidatePath(`/kids/${childId}`);

    return { errors: new Map(), success: true };
  } catch (error) {
    errors.set("common", `Error creating task: ${error}`);
    return { errors };
  }
}

export async function getTasks(childId: string) {
  const session = await auth();
  const token = session?.user?.accessToken;

  if (!token) {
    throw new Error("No authorization token found");
  }

  try {
    const response = await fetch(
      `https://quest4kids-a7fd24f91954.herokuapp.com/tasks?childId=${childId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw new Error("Failed to get tasks. Please try again later.");
  }
}

export async function deleteTask(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const errors = new Map<string, string>();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const childId = formData.get("childId");
  if (!childId) {
    errors.set("common", "Child ID is required");
    return { errors };
  }

  const taskId = formData.get("taskId");
  if (!taskId) {
    errors.set("common", "Task ID is required");
    return { errors };
  }

  try {
    const response = await fetch(
      `https://quest4kids-a7fd24f91954.herokuapp.com/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, ${response.statusText}`,
      );
    }

    revalidatePath(`/kids/${childId}`);

    return { errors: new Map(), success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task. Please try again later.");
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import * as yup from "yup";

type FormState = {
  errors: string[];
  success?: boolean;
  values?: {
    title?: string;
    description?: string;
    points?: number;
    status?: string;
  };
};

export async function addTask(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const errors: string[] = [];
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    errors.push("No authorization token found");
    return { errors };
  }

  const childId = formData.get("childId");
  if (!childId) {
    errors.push("Child ID is required");
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
      errors.push(...error.errors);
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
      errors.push(
        `HTTP error! status: ${response.status}, ${response.statusText}`,
      );
      return { errors };
    }

    revalidatePath(`/kids/${childId}`);

    return { errors: [], success: true };
  } catch (error) {
    errors.push(`Error creating task: ${error}`);
    return { errors };
  }
}

export async function getTasks() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const response = await fetch(
      `https://quest4kids-a7fd24f91954.herokuapp.com/tasks`,
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

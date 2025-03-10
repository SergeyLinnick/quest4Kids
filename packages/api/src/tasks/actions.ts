"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { taskSchema } from "./resolver";
import { taskService } from "./services";
import { ITaskResponse } from "./types";

export const addTask = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const childId = formData.get("childId");

  try {
    const task = await taskSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      points: Number(formData.get("points")),
      status: formData.get("status"),
      childId,
    });
    await taskService.addTask(task);
    revalidatePath(`/kids/${childId}`);
  } catch (error) {
    return handleValidationError(error, formData);
  }

  redirect(`/kids/${childId}`);
};

export const fetchChildTasks = async (
  childId: string,
): Promise<ITaskResponse> => {
  return await taskService.getTasksByChildId(childId);
};

export const deleteTask = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const errors = new Map<string, string>();

  const taskId = formData.get("taskId")?.toString();
  const childId = formData.get("childId")?.toString();

  if (!taskId) {
    errors.set("common", "Task ID is required");
    return { errors };
  }

  try {
    await taskService.deleteTask(taskId);
    revalidatePath(`/kids/${childId}`);
    return { errors: new Map(), success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error(`Failed to delete task. Please try again later: ${error}`);
  }
};

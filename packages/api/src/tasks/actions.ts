"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { TASK_STATUS } from "./const";
import { taskSchema } from "./resolver";
import { taskService } from "./services";
import {
  ITaskResponse,
  ITaskStatistics,
  TaskLabelsName,
  TaskStatusName,
} from "./types";

export const addTask = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const userId = formData.get("childId");
  const labelsArr = [];
  const label = formData.get("labels") as TaskLabelsName | null;
  if (label) {
    labelsArr.push(label);
  }

  try {
    const task = await taskSchema.parse({
      title: formData.get("title"),
      description: formData.get("description"),
      points: Number(formData.get("points")),
      status: formData.get("status"),
      labels: labelsArr,
      userId,
    });
    await taskService.addTask(task);
    revalidatePath(`/kids/${userId}`);

    return { errors: new Map(), success: true };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

export const getTasks = async (filters?: {
  [key: string]: string;
}): Promise<ITaskResponse> => {
  return await taskService.getTasks(filters);
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

export const changeStatusTask = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const errors = new Map<string, string>();

  const taskId = formData.get("taskId")?.toString();
  const childId = formData.get("childId")?.toString();
  const status = formData.get("status")?.toString();

  if (!taskId) {
    errors.set("common", "Task ID is required");
    return { errors };
  }

  try {
    await taskService.updateTask(taskId, { status: status as TaskStatusName });
    revalidatePath(`/kids/${childId}`);
    if (status === TASK_STATUS.DONE.name) {
      revalidateTag("children-list");
    }
    return { errors: new Map(), success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error(`Failed to update task. Please try again later: ${error}`);
  }
};

export const changeLabelsTask = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const errors = new Map<string, string>();

  const taskId = formData?.get?.("taskId")?.toString();
  const childId = formData?.get?.("childId")?.toString();
  const label = formData?.get?.("labels") as TaskLabelsName | null;

  const labelsArr = [];
  if (label) {
    labelsArr.push(label);
  }

  if (!taskId) {
    errors.set("common", "Task ID is required");
    return { errors };
  }

  try {
    await taskService.updateTask(taskId, { labels: labelsArr });
    revalidatePath(`/kids/${childId}`);

    return { errors: new Map(), success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error(`Failed to update task. Please try again later: ${error}`);
  }
};

export const getTaskStatistics = async (filters?: {
  [key: string]: string;
}): Promise<ITaskStatistics[]> => {
  const response = await taskService.taskStatistics(filters);
  return response.data;
};

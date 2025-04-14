import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import {
  ICreateTask,
  ITask,
  ITaskResponse,
  ITaskStatistics,
  IUpdateTask,
} from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const taskService = {
  addTask: ({
    title,
    description,
    points,
    status,
    labels,
    userId,
  }: ICreateTask): Promise<ITask> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.TASK.ADD_TASK(userId)}`,
      body: JSON.stringify({
        title,
        description,
        points,
        status,
        labels,
      }),
    };

    return authHttpClient.fetch(options);
  },

  getTasks: (filters?: { [key: string]: string }): Promise<ITaskResponse> => {
    const searchParams = new URLSearchParams({
      limit: "50",
    });

    if (filters?.status) {
      searchParams.set("status", filters.status);
    }
    if (filters?.childId) {
      searchParams.set("childId", filters.childId);
    }

    const params = searchParams.toString();

    const options = {
      method: "GET",
      url: `${api}${API_PATH.TASK.GET_TASKS}?${params}`,
    };

    return authHttpClient.fetch(options);
  },

  deleteTask: (taskId: string): Promise<ITask> => {
    const options = {
      method: "DELETE",
      url: `${api}${API_PATH.TASK.DELETE_TASK(taskId)}`,
    };

    return authHttpClient.fetch(options);
  },

  updateTask: (taskId: string, values: IUpdateTask): Promise<ITask> => {
    const { title, description, points, status, labels } = values;

    const options = {
      method: "PATCH",
      url: `${api}${API_PATH.TASK.UPDATE_TASK(taskId)}`,
      body: JSON.stringify({ title, description, points, status, labels }),
    };

    return authHttpClient.fetch(options);
  },

  taskStatistics: (filters?: {
    [key: string]: string;
  }): Promise<{ data: ITaskStatistics[] }> => {
    const searchParams = new URLSearchParams({});
    if (filters?.childId) {
      searchParams.set("childId", filters.childId);
    }

    const params = searchParams.toString();

    const options = {
      method: "GET",
      url: `${api}${API_PATH.TASK.GET_TASK_STATISTICS}?${params}`,
    };

    return authHttpClient.fetch(options);
  },
};

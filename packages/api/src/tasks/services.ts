import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { ICreateTask, ITask, ITaskResponse } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const taskService = {
  addTask: ({
    title,
    description,
    points,
    status,
    childId,
  }: ICreateTask): Promise<ITask> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.TASK.ADD_TASK(childId)}`,
      body: JSON.stringify({ title, description, points, status }),
    };

    return authHttpClient.fetch(options);
  },

  getTasksByChildId: (childId: string): Promise<ITaskResponse> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.TASK.GET_TASKS}?childId=${childId}`,
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
};

import { API_PATH } from "../_common/consts";
import { clientRequestWithAuth } from "../_common/request";
import { ICreateTask, ITask } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;
export const getTasksURL = "test";

export const taskService = {
  addTask: ({
    childId,
    title,
    description,
    points,
    status,
  }: ICreateTask & { childId: string }): Promise<ITask> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.TASK.ADD_TASK(childId)}`,
      data: JSON.stringify({ title, description, points, status }),
    };

    return clientRequestWithAuth(options);
  },
};

import { TASK_STATUS } from "./const";

export interface ITask {
  id: string;
  title: string;
  description: string;
  points: number;
  status: TaskStatusName;
  userId: string;
  // labels?: { name: string }[];
}

export type ICreateTask = Omit<ITask, "id">;

export type IUpdateTask = Partial<ICreateTask>;

export type ITaskResponse = {
  data: ITask[];
};

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type TaskStatusName =
  (typeof TASK_STATUS)[keyof typeof TASK_STATUS]["name"];

export interface ITaskStatistics {
  openTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  id: string;
  name: string;
}

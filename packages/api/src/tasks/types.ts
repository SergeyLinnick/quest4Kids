import { TASK_LABELS, TASK_STATUS } from "./const";

export interface ITask {
  id: string;
  title: string;
  description: string;
  points: number;
  status: TaskStatusName;
  userId: string;
  labels: TaskLabelsName[];
}
// TODO fix types
// export type ICreateTask = Omit<ITask, "id">;
export type ICreateTask = any;

export type IUpdateTask = Partial<ICreateTask>;

export type ITaskResponse = {
  data: ITask[];
};

export type TaskStatus = (typeof TASK_STATUS)[keyof typeof TASK_STATUS];
export type TaskStatusName =
  (typeof TASK_STATUS)[keyof typeof TASK_STATUS]["name"];

export type TaskLabelsName = (typeof TASK_LABELS)[keyof typeof TASK_LABELS];

export interface ITaskStatistics {
  openTasks: number;
  inProgressTasks: number;
  doneTasks: number;
  id: string;
  name: string;
}

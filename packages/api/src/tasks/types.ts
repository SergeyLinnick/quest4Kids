import { TASK_LABELS, TASK_STATUS } from "./const";

export interface ITask {
  id: string;
  title: string;
  description: string;
  points: number;
  status: TaskStatusName;
  userId: string;
  labels: {
    id: string;
    name: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export type ICreateTask = Omit<ITask, "id" | "labels"> & {
  labels: string[];
};

export type IUpdateTask = Partial<ICreateTask>;

export type ITaskResponse = {
  data: {
    id: string;
    title: string;
    description: string;
    points: number;
    status: TaskStatusName;
    userId: string;
    labels: {
      id: string;
      name: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
  }[];
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
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

export interface TasksQueryParams {
  status?: string;
  childId?: string;
  limit?: string;
  offset?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

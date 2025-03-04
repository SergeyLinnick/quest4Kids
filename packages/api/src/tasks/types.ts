export interface ITask {
  id: string;
  title: string;
  description: string;
  points: number;
  status: string;
  // labels?: { name: string }[];
}

export type ICreateTask = Omit<ITask, "id">;

export type IUpdateTask = Partial<ICreateTask>;

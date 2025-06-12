export {
  addTask,
  changeLabelsTask,
  changeStatusTask,
  deleteTask,
  getTasks,
  getTaskStatistics,
} from "./actions";
export { TASK_LABELS, TASK_POINTS, TASK_STATUS } from "./const";
export type {
  ICreateTask,
  ITask,
  ITaskStatistics,
  IUpdateTask,
  TaskStatus,
  TaskStatusName,
} from "./types";

export { prefetchTasks } from "./queries/prefetchTasks";
export { useAddTask } from "./queries/useAddTask";
export { useGetTasks } from "./queries/useGetTasks";
export { taskSchema } from "./resolver";

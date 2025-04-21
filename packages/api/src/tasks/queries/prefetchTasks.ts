import type { Session } from "@repo/auth";
import { QueryClient } from "@tanstack/react-query";
import { TasksQueryParams } from "../types";
import { tasksQueryOptions } from "./tasksQueryOptions";

export const prefetchTasks = (
  queryClient: QueryClient,
  filters: TasksQueryParams,
  session: Session,
) => {
  return queryClient.prefetchQuery(tasksQueryOptions(filters, session));
};

import { QueryClient } from "@tanstack/react-query";
import type { Session } from "next-auth";
import { TasksQueryParams } from "../types";
import { tasksQueryOptions } from "./tasksQueryOptions";

export const prefetchTasks = (
  queryClient: QueryClient,
  filters: TasksQueryParams,
  session: Session,
) => {
  return queryClient.prefetchQuery(tasksQueryOptions(filters, session));
};

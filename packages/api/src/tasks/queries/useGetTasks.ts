import { useSession } from "@repo/auth";
import { useQuery } from "@tanstack/react-query";
import { TasksQueryParams } from "../types";
import { tasksQueryOptions } from "./tasksQueryOptions";

export const useGetTasks = (filters: TasksQueryParams) => {
  const { session } = useSession();
  return useQuery({
    ...tasksQueryOptions(filters, session),
  });
};

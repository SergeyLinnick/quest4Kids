import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TasksQueryParams } from "../types";
import { tasksQueryOptions } from "./tasksQueryOptions";

export const useGetTasks = (filters: TasksQueryParams) => {
  const { data: session } = useSession();
  return useQuery({
    ...tasksQueryOptions(filters, session),
  });
};

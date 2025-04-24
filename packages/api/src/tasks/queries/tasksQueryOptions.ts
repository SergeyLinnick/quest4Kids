import type { Session } from "@repo/auth";

import { queryOptions } from "@tanstack/react-query";
import { taskService } from "../services";
import { TasksQueryParams } from "../types";

export function tasksQueryOptions(filters: TasksQueryParams, session: Session) {
  return queryOptions({
    queryKey: ["tasksListQuery", filters],
    queryFn: () => {
      return taskService.getTasks(filters, session);
    },
    staleTime: 10000,
  });
}

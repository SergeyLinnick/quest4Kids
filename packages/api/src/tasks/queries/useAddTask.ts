import { Session } from "@repo/auth";
import { useMutation } from "@tanstack/react-query";
import { taskService } from "../services";
import type { ICreateTask, ITask } from "../types";

export const useAddTask = (session: Session) => {
  const {
    mutate: addTask,
    isPending: isLoading,
    error,
  } = useMutation<ITask, Error, ICreateTask>({
    mutationFn: (data: ICreateTask) => {
      console.log("data ===>  ", data);
      return taskService.addTask(data, session);
    },
    onError: (error) => {
      console.error("Error adding task:", error);
    },
  });

  return { addTask, isLoading, error };
};

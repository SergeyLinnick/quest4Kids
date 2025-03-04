import { useMutation } from "@tanstack/react-query";
import { taskService } from "./services";
import { ICreateTask, ITask } from "./types";

export const useAddTask = () => {
  const {
    mutate: addTask,
    isPending: isLoading,
    error,
  } = useMutation<ITask, Error, ICreateTask & { childId: string }>({
    mutationFn: taskService.addTask,
    onSuccess: (data) => {
      console.log("Task Added:", data);
    },
    onError: (error) => {
      console.error("Error creating task:", error);
    },
  });

  return { addTask, isLoading, error };
};

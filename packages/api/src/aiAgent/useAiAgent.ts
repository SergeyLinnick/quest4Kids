"use client";

import { useSession } from "@repo/auth";
import { useMutation } from "@tanstack/react-query";
import { aiAgentService } from "./services";
import { AgentPayload, AgentResult } from "./types";

export const useAiAgent = (onSuccess?: (data: any) => void) => {
  const { session } = useSession();
  const {
    mutate: generate,
    isPending: isLoading,
    error,
  } = useMutation<AgentResult, Error, AgentPayload>({
    mutationFn: ({ type, input }) => {
      return aiAgentService.generate({ type, input, session });
    },
    onError: (error) => {
      console.error("Error generating task:", error);
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
  });

  return { generate, isLoading, error };
};

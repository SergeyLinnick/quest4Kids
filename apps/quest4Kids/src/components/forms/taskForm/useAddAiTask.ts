import { useAiAgent } from "@repo/api";
import { useRouter } from "next/navigation";

type AiAgentReturn = {
  generate: (payload: { type: "task" | "description"; input: string }) => void;
  isLoading: boolean;
  error: Error | null;
};

export const useAddAiTask = (
  childId: string,
  onFinish?: () => void,
): AiAgentReturn => {
  const router = useRouter();

  const onSuccess = (data: any) => {
    const params = new URLSearchParams({
      title: data.title,
      description: data.description,
      points: data.points,
      status: data.status,
      labels: data.labels[0],
    });
    router.push(`/kids/${childId}/add-task-client?${params.toString()}`);
    onFinish?.();
  };

  return useAiAgent(onSuccess);
};

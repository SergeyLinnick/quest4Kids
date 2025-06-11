"use client";

import { Button } from "@repo/ui";
import { BotIcon } from "@repo/ui-tw";
import { useMutation } from "@tanstack/react-query";

interface DescriptionButtonProps {
  prompt: string;
  onDescriptionGenerated?: (description: string) => void;
}

const generateDescriptionMutation = async ({ title }: { title: string }) => {
  const res = await fetch("/api/ai/generate-description", {
    method: "POST",
    body: JSON.stringify({ title }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to generate description");
  }

  return res.json();
};

export const DescriptionButton = ({
  prompt = "test",
  onDescriptionGenerated,
}: DescriptionButtonProps) => {
  const { mutate: generateDescription, isPending: loading } = useMutation({
    mutationFn: generateDescriptionMutation,
    onSuccess: (data) => {
      console.log("description", data.description);
      if (onDescriptionGenerated && data.description) {
        onDescriptionGenerated(data.description);
      }
    },
    onError: (error) => {
      console.error("Failed to generate description:", error);
    },
  });

  const handleGenerateDescription = () => {
    if (!prompt) return;
    generateDescription({ title: prompt });
  };

  return (
    <Button
      type="button"
      onClick={handleGenerateDescription}
      isLoading={loading}
      disabled={loading || !prompt}
      size="2"
    >
      <BotIcon />
    </Button>
  );
};

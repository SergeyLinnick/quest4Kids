"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Popover, Text, TextArea } from "@radix-ui/themes";
import { AddIcon } from "@repo/ui";
import { toast } from "@repo/ui-tw";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface DescriptionButtonProps {
  title?: string;
  description?: string;
  onDescriptionGenerated?: (description: string) => void;
  childId: string;
}

const taskSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type GeneratedTask = {
  title: string;
  description: string;
  points: "5" | "8" | "10" | "15";
  status: "OPEN";
  labels: string;
};

const generateTaskMutation = async (description: string) => {
  const res = await fetch("/api/ai/generate-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to generate task");
  }

  return res.json() as Promise<GeneratedTask>;
};

export const AddTaskButton = ({ childId }: DescriptionButtonProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      description: "",
    },
  });

  const { mutate: generateTask, isPending: isGenerating } = useMutation({
    mutationFn: generateTaskMutation,
    onSuccess: (data) => {
      // Navigate to the task creation page with the generated data
      const searchParams = new URLSearchParams({
        title: data.title,
        description: data.description,
        points: data.points,
        status: data.status,
        labels: data.labels,
      });
      router.push(
        `/kids/${childId}/add-task-client?${searchParams.toString()}`,
      );
      reset();
    },
    onError: (error) => {
      toast.error("Failed to generate task", {
        description:
          error instanceof Error ? error.message : "Unknown error occurred",
      });
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    generateTask(data.description);
  };

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button variant="soft" size="3">
          <AddIcon />
          Add AI Task
        </Button>
      </Popover.Trigger>
      <Popover.Content width="360px">
        <Form.Root onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="3">
            <Box flexGrow="1">
              <TextArea
                placeholder="Write something..."
                style={{ height: 80 }}
                {...register("description")}
                disabled={isSubmitting || isGenerating}
              />
              {errors.description && (
                <Text color="red" size="1">
                  {errors.description.message}
                </Text>
              )}
              <Flex gap="3" mt="3" justify="between">
                <Button
                  size="1"
                  type="submit"
                  disabled={isSubmitting || isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate Task"}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Form.Root>
      </Popover.Content>
    </Popover.Root>
  );
};

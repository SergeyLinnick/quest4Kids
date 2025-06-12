"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text } from "@radix-ui/themes";
import { TASK_LABELS, TASK_POINTS, TASK_STATUS, useAddTask } from "@repo/api";
import { useSession } from "@repo/auth";
import { Button } from "@repo/ui";
import { toast } from "@repo/ui-tw";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DescriptionButton } from "./descriptionButton";

const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description must be less than 300 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]),
  points: z.string(),
  userId: z.string(),
  labels: z.string(),
}) satisfies z.ZodType;

type TicketFormValues = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  childId: string;
}

export const TicketForm = ({ childId }: TicketFormProps) => {
  const { session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTitle = searchParams.get("title") || "";
  const initialDescription = searchParams.get("description") || "";
  const initialPoints = searchParams.get("points") || "8";
  const initialLabels = searchParams.get("labels") || TASK_LABELS.HOME;
  const status = searchParams.get("status") || TASK_STATUS.OPEN.name;

  const { addTask, isLoading } = useAddTask(session);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    mode: "onChange",
    resolver: zodResolver(ticketSchema),
    values: {
      userId: childId,
      labels: initialLabels,
      points: initialPoints,
      status: status as "OPEN" | "IN_PROGRESS" | "DONE",
      title: initialTitle,
      description: initialDescription,
    },
    defaultValues: {
      userId: childId,
      labels: TASK_LABELS.HOME,
      points: "8",
      status: TASK_STATUS.OPEN.name,
    },
  });

  const onSubmit = (data: TicketFormValues) => {
    addTask({
      ...data,
      points: Number(data.points),
      labels: [data.labels],
    });
    reset();
    const params = new URLSearchParams(searchParams);
    params.delete("title");
    params.delete("description");
    params.delete("points");
    params.delete("labels");
    params.delete("status");
    router.replace(`/kids/${childId}`);
    toast.success("Task created successfully");
  };

  const title = watch("title");
  const description = watch("description");

  const onDescriptionGenerated = (description: string) => {
    setValue("description", description, { shouldValidate: true });
  };

  return (
    <Box maxWidth="400px">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("userId")} />
        <Flex direction="column" gap="4">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              {...register("title")}
              disabled={isLoading}
              className="w-full p-2 border rounded"
            />
            {errors.title && <Text color="red">{errors.title.message}</Text>}
          </div>

          <div className="relative">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description")}
              disabled={isLoading}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <Text color="red">{errors.description.message}</Text>
            )}
            <div className="absolute right-2 top-8">
              <DescriptionButton
                title={title}
                description={description}
                onDescriptionGenerated={onDescriptionGenerated}
              />
            </div>
          </div>

          <div>
            <label htmlFor="labels">Task Label</label>
            <select
              id="labels"
              {...register("labels", { required: "Label is required" })}
              disabled={isLoading}
              className="w-full p-2 border rounded"
            >
              {Object.values(TASK_LABELS).map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
            {errors.labels && <Text color="red">{errors.labels.message}</Text>}
          </div>

          <div>
            <label>Coins</label>
            <div className="grid grid-cols-4 gap-2">
              {Object.values(TASK_POINTS).map((points) => (
                <label key={points} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={points}
                    {...register("points")}
                    disabled={isLoading}
                  />
                  {points}
                </label>
              ))}
            </div>
            {errors.points && <Text color="red">{errors.points.message}</Text>}
          </div>

          <div>
            <label>Status</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(TASK_STATUS).map((status) => (
                <label key={status.name} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={status.name}
                    {...register("status")}
                    disabled={isLoading}
                  />
                  {status.value}
                </label>
              ))}
            </div>
            {errors.status && <Text color="red">{errors.status.message}</Text>}
          </div>

          <Form.Submit asChild>
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Create Task
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

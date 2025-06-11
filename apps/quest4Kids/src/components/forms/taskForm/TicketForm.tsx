"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex, Text } from "@radix-ui/themes";
import { TASK_LABELS, TASK_POINTS, TASK_STATUS } from "@repo/api";
import { Button } from "@repo/ui";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DescriptionButton } from "./descriptionButton";

const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(50, "Description must be less than 50 characters"),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"]),
  points: z.number().int().positive(),
  userId: z.string(),
  labels: z.string(),
}) satisfies z.ZodType;

type TicketFormValues = z.infer<typeof ticketSchema>;

interface TicketFormProps {
  childId: string;
}

export const TicketForm = ({ childId }: TicketFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TicketFormValues>({
    mode: "onChange",
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      userId: childId,
      labels: TASK_LABELS.HOME,
      points: 8,
      status: TASK_STATUS.OPEN.name,
    },
  });

  const onSubmit = async (data: TicketFormValues) => {
    console.log("Ticket data:", data);
    // TODO: Implement ticket submission
  };

  const title = watch("title");

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
              disabled={isSubmitting}
              className="w-full p-2 border rounded"
            />
            {errors.title && <Text color="red">{errors.title.message}</Text>}
          </div>

          <div className="relative">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...register("description")}
              disabled={isSubmitting}
              className="w-full p-2 border rounded"
            />
            {errors.description && (
              <Text color="red">{errors.description.message}</Text>
            )}
            <div className="absolute right-3 bottom-5">
              <DescriptionButton
                prompt={title}
                onDescriptionGenerated={onDescriptionGenerated}
              />
            </div>
          </div>

          <div>
            <label htmlFor="labels">Task Label</label>
            <select
              id="labels"
              {...register("labels", { required: "Label is required" })}
              disabled={isSubmitting}
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
                    {...register("points", {
                      setValueAs: (value) => Number(value),
                    })}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                  {status.value}
                </label>
              ))}
            </div>
            {errors.status && <Text color="red">{errors.status.message}</Text>}
          </div>

          <Button isLoading={isSubmitting} type="submit">
            Submit Ticket
          </Button>
        </Flex>
      </Form.Root>
    </Box>
  );
};

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Flex } from "@radix-ui/themes";
import { taskSchema } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { DescriptionButton } from "./descriptionButton";

interface TaskFormProps {
  childId: string;
}

type TaskFormValues = {
  userId: string;
  title: string;
  description: string;
  labels: string[];
  points: number;
  status: "OPEN" | "IN_PROGRESS" | "DONE";
};

export const TaskFormClient = ({ childId }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    mode: "onChange",
    resolver: zodResolver(taskSchema),
    // defaultValues: {
    //   userId: childId,
    //   labels: [TASK_LABELS.HOME],
    //   points: 8,
    //   status: TASK_STATUS.OPEN.name,
    // },
  });

  console.log("errors", errors);

  const onSubmit = async (data: TaskFormValues) => {
    console.log("data", data);
  };

  return (
    <Box maxWidth="400px">
      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        {/* <input type="hidden" name="userId" value={childId} /> */}
        <Flex direction="column" gap="4">
          <InputField
            isLoading={isSubmitting}
            label="Title"
            error={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />

          <InputField
            isLoading={isSubmitting}
            label="Description"
            error={errors.description?.message}
            as="textarea"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <DescriptionButton />

          {/* <TaskLabelsSelect
            label="Task Label"
            isLoading={isSubmitting}
            onChange={(value) => setValue("labels", [value])}
          />

          <Flex direction="column" gap="2">
            <Text as="label">Coins</Text>
            <RadioCards.Root
              defaultValue="8"
              onValueChange={(value) => setValue("points", Number(value))}
              columns={{ initial: "2", sm: "4" }}
            >
              {Object.values(TASK_POINTS).map((points) => (
                <Skeleton loading={isSubmitting} key={points}>
                  <RadioCards.Item value={String(points)}>
                    <Flex direction="column" width="100%">
                      <Text weight="bold">{points}</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
              ))}
            </RadioCards.Root>
          </Flex>

          <Flex direction="column" gap="2">
            <Text as="label">Status</Text>
            <RadioCards.Root
              defaultValue={TASK_STATUS.OPEN.name}
              onValueChange={(value) =>
                setValue("status", value as "OPEN" | "IN_PROGRESS" | "DONE")
              }
              columns={{ initial: "1", sm: "3" }}
            >
              {Object.values(TASK_STATUS).map((status) => (
                <Skeleton loading={isSubmitting} key={status.name}>
                  <RadioCards.Item value={status.name}>
                    <Flex direction="column" width="100%">
                      <Text weight="bold">{status.value}</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
              ))}
            </RadioCards.Root>
          </Flex> */}

          <Button isLoading={isSubmitting} type="submit">
            Add Task
          </Button>
        </Flex>
      </Form.Root>
    </Box>
  );
};

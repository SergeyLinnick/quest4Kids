"use client";

import { Box, Flex, RadioCards, Skeleton, Text } from "@radix-ui/themes";
import { addTask, TASK_LABELS, TASK_POINTS, TASK_STATUS } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { Form as RadixForm } from "radix-ui";
import { useActionState, useEffect } from "react";
import { TaskLabelsSelect } from "./TaskLabelsSelect";

interface TaskFormProps {
  childId: string;
  isModal?: boolean;
}

export const TaskForm = ({ childId, isModal = false }: TaskFormProps) => {
  const router = useRouter();
  const formData = new FormData();
  formData.set("labels", TASK_LABELS.HOME);
  const initialState = {
    errors: new Map(),
    values: formData,
  };
  const [state, formAction, isPending] = useActionState(addTask, initialState);

  const { values, errors, success } = state;

  useEffect(() => {
    if (success) {
      if (isModal) {
        router.back();
      } else {
        router.push(`/kids/${childId}`);
      }
    }
  }, [router, success, isModal, childId]);

  return (
    <Box maxWidth="400px">
      <RadixForm.Root asChild>
        <Form action={formAction}>
          <input type="hidden" name="childId" value={childId} />
          <Flex direction="column" gap="4">
            <InputField
              isLoading={isPending}
              label="Title"
              defaultValue={values?.get("title") as string}
              error={errors.get("title")}
              name="title"
            />

            <InputField
              isLoading={isPending}
              label="Name"
              defaultValue={values?.get("description") as string}
              error={errors.get("description")}
              name="description"
              as="textarea"
            />

            <TaskLabelsSelect
              label="Task Label"
              isLoading={isPending}
              values={values}
              errors={errors}
            />

            <Flex direction="column" gap="2" asChild>
              <RadixForm.Field name="points">
                <RadixForm.Label>Coins</RadixForm.Label>
                <RadioCards.Root
                  name="points"
                  defaultValue={String(values?.get("points") || 8)}
                  columns={{ initial: "2", sm: "4" }}
                >
                  {Object.values(TASK_POINTS).map((points) => (
                    <Skeleton loading={isPending} key={points}>
                      <RadioCards.Item value={String(points)}>
                        <Flex direction="column" width="100%">
                          <Text weight="bold">{points}</Text>
                        </Flex>
                      </RadioCards.Item>
                    </Skeleton>
                  ))}
                </RadioCards.Root>
              </RadixForm.Field>
            </Flex>

            <Flex direction="column" gap="2" asChild>
              <RadixForm.Field name="status">
                <RadixForm.Label>Status</RadixForm.Label>
                <RadioCards.Root
                  name="status"
                  defaultValue={
                    (values?.get("status") as string) || TASK_STATUS.OPEN.name
                  }
                  columns={{ initial: "1", sm: "3" }}
                >
                  {Object.values(TASK_STATUS).map((status) => (
                    <Skeleton loading={isPending} key={status.name}>
                      <RadioCards.Item value={status.name}>
                        <Flex direction="column" width="100%">
                          <Text weight="bold">{status.value}</Text>
                        </Flex>
                      </RadioCards.Item>
                    </Skeleton>
                  ))}
                </RadioCards.Root>
              </RadixForm.Field>
            </Flex>

            <Text color="red">{errors.get("common")}</Text>

            <Button isLoading={isPending} type="submit">
              Add Task
            </Button>
          </Flex>
        </Form>
      </RadixForm.Root>
    </Box>
  );
};

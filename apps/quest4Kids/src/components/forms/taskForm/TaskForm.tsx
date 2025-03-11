"use client";

import { Box, Flex, RadioCards, Skeleton, Text } from "@radix-ui/themes";
import { addTask, initialState } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface TaskFormProps {
  childId: string;
}

export const TaskForm = ({ childId }: TaskFormProps) => {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction, isPending] = useActionState(addTask, initialState);

  const { values, errors } = state;

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
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

          <Flex direction="column" gap="2" asChild>
            <Form.Field name="points">
              <Form.Label>Points</Form.Label>
              <RadioCards.Root
                name="points"
                defaultValue={String(values?.get("points") || 8)}
                columns={{ initial: "2", sm: "4" }}
              >
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="5">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">5</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="8">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">8</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="10">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">10</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="15">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">15</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
              </RadioCards.Root>
            </Form.Field>
          </Flex>

          <Flex direction="column" gap="2" asChild>
            <Form.Field name="status">
              <Form.Label>Status</Form.Label>
              <RadioCards.Root
                name="status"
                defaultValue={(values?.get("status") as string) || "OPEN"}
                columns={{ initial: "1", sm: "3" }}
              >
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="OPEN">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">Open</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="IN_PROGRESS">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">In Progress</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
                <Skeleton loading={isPending}>
                  <RadioCards.Item value="DONE">
                    <Flex direction="column" width="100%">
                      <Text weight="bold">Done</Text>
                    </Flex>
                  </RadioCards.Item>
                </Skeleton>
              </RadioCards.Root>
            </Form.Field>
          </Flex>

          <Text color="red">{errors.get("common")}</Text>

          <Form.Submit asChild>
            <Button isLoading={isPending} type="submit">
              Add Task
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

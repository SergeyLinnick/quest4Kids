"use client";

import {
  Box,
  Flex,
  RadioCards,
  Skeleton,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import { Button } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";
import { addTask } from "./actions";

interface TaskFormProps {
  childId: string;
}

const initialState = { errors: new Map<string, string>(), values: {} };

export const TaskForm = ({ childId }: TaskFormProps) => {
  // useActionState is available with React 19 (Next.js App Router)
  const [state, formAction, isPending] = useActionState(addTask, initialState);

  const { values, errors } = state;

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <input type="hidden" name="childId" value={childId} />
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="2" asChild>
            <Form.Field name="title">
              <Form.Label>Title</Form.Label>
              <Skeleton loading={isPending}>
                <Form.Control asChild>
                  <TextField.Root size="3" defaultValue={values?.title || ""} />
                </Form.Control>
              </Skeleton>
              <Form.Message asChild>
                <Text color="red">{errors.get("title")}</Text>
              </Form.Message>
            </Form.Field>
          </Flex>

          <Flex direction="column" gap="2" asChild>
            <Form.Field name="description">
              <Form.Label>Description</Form.Label>
              <Skeleton loading={isPending}>
                <Form.Control asChild>
                  <TextArea size="3" defaultValue={values?.description || ""} />
                </Form.Control>
              </Skeleton>
              <Form.Message asChild>
                <Text color="red">{errors.get("description")}</Text>
              </Form.Message>
            </Form.Field>
          </Flex>

          <Flex direction="column" gap="2" asChild>
            <Form.Field name="points">
              <Form.Label>Points</Form.Label>
              <RadioCards.Root
                name="points"
                defaultValue={String(values?.points || 8)}
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
                defaultValue={values?.status || "OPEN"}
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

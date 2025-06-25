"use client";

import { Box, Button, Flex, Popover, Text, TextArea } from "@radix-ui/themes";
import { AddIcon } from "@repo/ui";
import { Form } from "radix-ui";
import { useAddAiTask } from "./useAddAiTask";
import { PromptFormValues, usePromptForm } from "./usePromptForm";

interface AddAiTaskPopoverProps {
  title?: string;
  description?: string;
  onDescriptionGenerated?: (description: string) => void;
  childId: string;
}

export const AddAiTaskPopover = ({ childId }: AddAiTaskPopoverProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = usePromptForm();

  const { generate, isLoading } = useAddAiTask(childId, reset);

  const onSubmit = async (data: PromptFormValues) => {
    generate({ type: "task", input: data.description });
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
                disabled={isLoading}
              />
              {errors.description && (
                <Text color="red" size="1">
                  {errors.description.message}
                </Text>
              )}
              <Flex gap="3" mt="3" justify="between">
                <Button size="1" type="submit" disabled={isLoading}>
                  {isLoading ? "Generating..." : "Generate Task"}
                </Button>
              </Flex>
            </Box>
          </Flex>
        </Form.Root>
      </Popover.Content>
    </Popover.Root>
  );
};

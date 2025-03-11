"use client";

import { Box, Button } from "@radix-ui/themes";
import { deleteTask, initialState } from "@repo/api";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface RemoveTaskFormProps {
  taskId: string;
  childId: string;
}

export const RemoveTaskForm = ({ taskId, childId }: RemoveTaskFormProps) => {
  const [, formAction, isPending] = useActionState(deleteTask, initialState);

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <input type="hidden" name="taskId" value={taskId} />
        <input type="hidden" name="childId" value={childId} />

        <Form.Submit asChild>
          <Button
            variant="outline"
            color="red"
            loading={isPending}
            type="submit"
          >
            Delete
          </Button>
        </Form.Submit>
      </Form.Root>
    </Box>
  );
};

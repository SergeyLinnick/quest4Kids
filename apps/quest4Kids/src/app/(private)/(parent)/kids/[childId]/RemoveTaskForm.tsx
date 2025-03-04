"use client";

import { Box, Button } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { useActionState } from "react";
import { deleteTask } from "./actions";

interface RemoveTaskFormProps {
  taskId: string;
  childId: string;
}

const initialState = { errors: new Map<string, string>(), values: {} };

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

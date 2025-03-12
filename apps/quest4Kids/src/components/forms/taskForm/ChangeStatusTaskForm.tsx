"use client";

import { Box, Button } from "@radix-ui/themes";
import {
  changeStatusTask,
  initialState,
  TASK_STATUS,
  TaskStatus,
} from "@repo/api";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ChangeStatusTaskFormProps {
  taskId: string;
  childId: string;
  status?: TaskStatus;
  isDisabled?: boolean;
}

export const ChangeStatusTaskForm = ({
  taskId,
  childId,
  status = TASK_STATUS.DONE,
  isDisabled = false,
}: ChangeStatusTaskFormProps) => {
  const [, formAction, isPending] = useActionState(
    changeStatusTask,
    initialState,
  );

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <input type="hidden" name="taskId" value={taskId} />
        <input type="hidden" name="childId" value={childId} />
        <input type="hidden" name="status" value={status.name} />
        <Form.Submit asChild>
          <Button
            type="submit"
            variant="outline"
            color={status.color}
            loading={isPending}
            disabled={isDisabled}
          >
            {status.value}
          </Button>
        </Form.Submit>
      </Form.Root>
    </Box>
  );
};

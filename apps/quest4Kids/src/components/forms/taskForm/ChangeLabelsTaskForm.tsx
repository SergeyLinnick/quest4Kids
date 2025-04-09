"use client";

import { Box, Button, Flex } from "@radix-ui/themes";
import { changeLabelsTask } from "@repo/api";
import { Form } from "radix-ui";
import { useActionState } from "react";
import { TaskLabelsSelect } from "./TaskLabelsSelect";

interface ChangeLabelsTaskFormProps {
  taskId: string;
  childId: string;
  initialValues?: FormData;
  isDisabled?: boolean;
}

export const ChangeLabelsTaskForm = ({
  taskId,
  childId,
  initialValues,
  isDisabled = false,
}: ChangeLabelsTaskFormProps) => {
  const initialState = {
    errors: new Map(),
    values: initialValues,
  };
  const [state, formAction, isPending] = useActionState(
    changeLabelsTask,
    initialState,
  );

  const { values, errors } = state;

  // const submitFormData = (formAction: any, formData: FormData) => {
  //   formAction({
  //     values: () => formData,
  //   });
  // };

  // const submitOnChange = (value: string) => {
  //   const updatedValues = new FormData();
  //   updatedValues.set("taskId", taskId);
  //   updatedValues.set("childId", childId);
  //   updatedValues.set("labels", value);

  //   submitFormData(formAction, updatedValues);
  // };

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <Flex>
          <input type="hidden" name="taskId" value={taskId} />
          <input type="hidden" name="childId" value={childId} />
          <TaskLabelsSelect
            isLoading={isPending}
            values={values}
            errors={errors}
          />
          <Form.Submit asChild>
            <Button
              size="2"
              type="submit"
              variant="outline"
              loading={isPending}
              disabled={isDisabled}
            >
              +
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

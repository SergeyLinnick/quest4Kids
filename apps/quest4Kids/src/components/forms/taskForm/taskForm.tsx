"use client";

import { Flex } from "@radix-ui/themes";
import { ICreateTask } from "@repo/api";
import { Button, FormField } from "@repo/ui";
import { useAddTask } from "node_modules/@repo/api/src/tasks";
import { Form } from "radix-ui";
import { useForm } from "react-hook-form";
import { taskFormValidation } from "./resolver";
export const TaskForm = ({ childId }: { childId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTask>({
    resolver: taskFormValidation,
    reValidateMode: "onChange",
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      title: "",
      description: "",
      points: 0,
      status: "",
      // labels: [{ name: "Shopping" }],
    },
    // values,
  });

  const { addTask, isLoading } = useAddTask();

  const onSubmit = (data: ICreateTask) => {
    console.log("data...", data);
    addTask({ ...data, childId });
  };

  return (
    <Form.Root className="FormRoot" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="5" maxWidth="300px">
        <FormField
          name="title"
          label="Title"
          placeholder="Enter title"
          register={register("title")}
          isLoading={isLoading}
          error={errors.title?.message}
        />
        <FormField
          name="description"
          label="Description"
          placeholder="Enter description"
          register={register("description")}
          isLoading={isLoading}
          error={errors.description?.message}
        />

        <FormField
          name="points"
          label="Points"
          placeholder="Enter points"
          register={register("points")}
          isLoading={isLoading}
          error={errors.points?.message}
        />

        <FormField
          name="status"
          label="Status"
          placeholder="Enter status"
          register={register("status")}
          isLoading={isLoading}
          error={errors.status?.message}
        />

        <Form.Submit asChild>
          <Button isLoading={isLoading}>Add Task</Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
};

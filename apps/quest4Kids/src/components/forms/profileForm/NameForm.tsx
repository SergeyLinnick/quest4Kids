"use client";

import { Flex, Text } from "@radix-ui/themes";
import { editChildAccount } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ProfileFormProps {
  id: string;
  initialValue: string;
}

export const NameForm = ({ id, initialValue }: ProfileFormProps) => {
  const formData = new FormData();
  formData.set("name", initialValue);
  const initialState = { errors: new Map(), values: formData };

  const [state, formAction, isPending] = useActionState(
    editChildAccount,
    initialState,
  );

  const { errors, values } = state;

  return (
    <Form.Root action={formAction}>
      <Flex direction="column" gap="4">
        <InputField
          label="Name"
          name="name"
          defaultValue={values?.get("name") as string}
          isLoading={isPending}
          error={errors.get("name")}
        />
        <input type="hidden" name="id" value={id} />

        <Form.Submit asChild>
          <Button isLoading={isPending} type="submit">
            Change Name
          </Button>
        </Form.Submit>
      </Flex>

      {errors.get("common") && <Text color="red">{errors.get("common")}</Text>}
      {state.success && <Text color="green">Name changed successfully!</Text>}
    </Form.Root>
  );
};

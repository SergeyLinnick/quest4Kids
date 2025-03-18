"use client";

import { Flex, Text } from "@radix-ui/themes";
import { addAvatar, initialState } from "@repo/api";
import { Button } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ProfileFormProps {
  id: string;
}

export const AvatarForm = ({ id }: ProfileFormProps) => {
  const [state, formAction, isPending] = useActionState(
    addAvatar,
    initialState,
  );

  const { errors } = state;

  return (
    <Form.Root action={formAction}>
      <input type="hidden" name="userId" value={id} />

      <Flex direction="column" gap="4">
        <label>Avatar</label>
        <input type="file" name="file" accept="image/*" />
        <Text as="span" color="red">
          {errors.get("file")}
        </Text>

        <Form.Submit asChild>
          <Button isLoading={isPending} type="submit">
            Add Avatar
          </Button>
        </Form.Submit>
      </Flex>

      {errors.get("common") && <Text color="red">{errors.get("common")}</Text>}
      {state.success && (
        <Text color="green">Avatar uploaded successfully!</Text>
      )}
    </Form.Root>
  );
};

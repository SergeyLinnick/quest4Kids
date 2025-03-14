"use client";

import { RoleType } from "@/types";
import { Flex, Text } from "@radix-ui/themes";
import { addAvatar, initialState } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ProfileFormProps {
  role: RoleType;
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
      <Flex direction="column" gap="4">
        <InputField
          isLoading={isPending}
          label="User ID"
          error={errors.get("userId")}
          name="userId"
          value={id}
          readOnly
        />
        <input type="hidden" name="userId" value={id} />

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

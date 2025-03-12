"use client";

import { RoleType } from "@/types";
import { Box, Flex, Text } from "@radix-ui/themes";
import { addAvatar, initialState } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ProfileFormProps {
  role: RoleType;
  userId: string;
}

export const ProfileForm = ({ userId }: ProfileFormProps) => {
  const [state, formAction, isPending] = useActionState(
    addAvatar,
    initialState,
  );

  const { values, errors } = state;

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <Flex direction="column" gap="4">
          <InputField
            isLoading={isPending}
            label="User ID"
            error={errors.get("userId")}
            name="userId"
            value={userId}
            readOnly
          />

          <label>Avatar</label>
          <input type="file" name="avatar" />

          <Text color="red">{errors.get("common")}</Text>

          <Form.Submit asChild>
            <Button isLoading={isPending} type="submit">
              Add Ava
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

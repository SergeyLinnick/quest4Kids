"use client";

import { Badge, DataList, Flex, Heading, Text } from "@radix-ui/themes";
import { editChildAccountById } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

interface ChangePasswordFormProps {
  id: string;
}

export const ChangePasswordForm = ({ id }: ChangePasswordFormProps) => {
  const formData = new FormData();

  const initialState = { errors: new Map(), values: formData, id };

  const [state, formAction, isPending] = useActionState(
    editChildAccountById,
    initialState,
  );

  const { errors, values } = state;

  return (
    <Form.Root action={formAction}>
      <Flex direction="column" gap="4">
        <InputField
          label="Current Password"
          name="oldPassword"
          type="password"
          defaultValue={values?.get("oldPassword") as string}
          isLoading={isPending}
          error={errors.get("oldPassword")}
          placeholder="Enter your current password"
        />

        <InputField
          label="New Password"
          name="password"
          isLoading={isPending}
          type="password"
          defaultValue={values?.get("password") as string}
          error={errors.get("password")}
          placeholder="Enter your new password"
        />

        <Form.Submit asChild>
          <Button isLoading={isPending} type="submit">
            Change Password
          </Button>
        </Form.Submit>
        {errors.get("common") && (
          <Text color="red">{errors.get("common")}</Text>
        )}
        {state.success && (
          <Text color="green">Password changed successfully!</Text>
        )}

        <Heading size="1">Requirements for passwords:</Heading>

        <DataList.Root orientation="vertical">
          <DataList.Item>
            <DataList.Value>
              <Badge color="gray" variant="soft" radius="full">
                At least 8 characters.
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Value>
              <Badge color="gray" variant="soft" radius="full">
                At least 1 uppercase letter
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Value>
              <Badge color="gray" variant="soft" radius="full">
                At least 1 lowercase letter
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Value>
              <Badge color="gray" variant="soft" radius="full">
                At least 1 number
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Value>
              <Badge color="gray" variant="soft" radius="full">
                At least 1 special character
              </Badge>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Flex>
    </Form.Root>
  );
};

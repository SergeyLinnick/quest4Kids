"use client";

import { Box, Flex, Text } from "@radix-ui/themes";
import { addChild, FormState, initialState } from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

export const ChildForm = () => {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    addChild,
    initialState,
  );

  const { values, errors } = state;

  return (
    <Box maxWidth="400px">
      <Form.Root action={formAction}>
        <Flex direction="column" gap="4">
          <InputField
            isLoading={isPending}
            label="Name"
            defaultValue={values?.get("name") as string}
            error={errors.get("name")}
            name="name"
          />
          <InputField
            isLoading={isPending}
            label="Email"
            defaultValue={values?.get("email") as string}
            error={errors.get("email")}
            name="email"
            type="email"
          />
          <InputField
            isLoading={isPending}
            label="Password"
            defaultValue={values?.get("password") as string}
            error={errors.get("password")}
            name="password"
            type="password"
          />
          <Text color="red">{errors.get("common")}</Text>

          <Form.Submit asChild>
            <Button isLoading={isPending} type="submit">
              Add Child
            </Button>
          </Form.Submit>
        </Flex>
      </Form.Root>
    </Box>
  );
};

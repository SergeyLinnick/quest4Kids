"use client";

import { Flex, Text } from "@radix-ui/themes";
import { addAvatar, initialState } from "@repo/api";
import { Button, ImagePicker } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState } from "react";

import styles from "./avatar.module.css";

interface ProfileFormProps {
  id: string;
  avatar: string;
}

export const AvatarForm = ({ id, avatar }: ProfileFormProps) => {
  const [state, formAction, isPending] = useActionState(
    addAvatar,
    initialState,
  );

  const { errors } = state;

  return (
    <Form.Root action={formAction} className={styles.formHolder}>
      <input type="hidden" name="userId" value={id} />

      <Flex align="center" justify="start">
        <ImagePicker label="Profile Avatar" name="file" avatar={avatar} />
      </Flex>
      <Form.Submit asChild className={styles.positionHack}>
        <Button loading={isPending} type="submit">
          Upload Avatar
        </Button>
      </Form.Submit>
      <Text as="span" color="red">
        {errors.get("file")}
      </Text>
      {errors.get("common") && <Text color="red">{errors.get("common")}</Text>}
      {state.success && (
        <Text color="green">Avatar uploaded successfully!</Text>
      )}
    </Form.Root>
  );
};

"use client";

import { Button, Flex } from "@radix-ui/themes";
import { Form } from "radix-ui";
import React, { useState } from "react";
import { CheckIcon, Cross1Icon, Pencil1Icon } from "../../icons";
import { InputField } from "../inputField/InputField";
import styles from "./inlineEdit.module.css";

interface InlineEditProps {
  value: string;
  label?: string;
  name: string;
  type: "text" | "email" | "password";
  isPending: boolean;
  errors: Map<string, string>;
  values: FormData;
  formAction: (formData: FormData) => void;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  label = "Edit",
  name,
  type,
  isPending,
  errors,
  values,
  formAction,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleAction = async (formData: FormData) => {
    await formAction(formData);

    if (errors.size === 0) {
      setIsEditing(false);
    }
  };

  return (
    <Form.Root action={handleAction}>
      <Flex direction="column" gap="2" asChild>
        <Form.Field name={name}>
          <Form.Label>{label}</Form.Label>
        </Form.Field>
      </Flex>
      {isEditing ? (
        <div className={styles.inputHolder}>
          <InputField
            label=""
            name={name}
            type={type}
            defaultValue={values?.get(name) as string}
            isLoading={isPending}
            error={errors?.get(name)}
          />
          <div className={styles.btnHolder}>
            <Button
              onClick={handleCancel}
              type="reset"
              variant="outline"
              color="red"
              title="Cancel"
              disabled={isPending}
            >
              <Cross1Icon />
            </Button>
            <Button
              color="violet"
              variant="outline"
              type="submit"
              loading={isPending}
              title="Submit"
              size="2"
              ml="1"
            >
              <CheckIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div
          title={`Click to edit ${label}`}
          className={styles.valueHolder}
          onClick={() => setIsEditing(true)}
        >
          {value || <i>Click to edit {label}</i>}
          <div className={styles.iconHolder}>
            <Pencil1Icon />
          </div>
        </div>
      )}
    </Form.Root>
  );
};

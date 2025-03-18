"use client";

import { Button } from "@radix-ui/themes";
import { Form } from "radix-ui";
import React, { useState } from "react";
import { InputField } from "../inputField/InputField";

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

  const handleAction = (formData: FormData) => {
    formAction(formData);
    setIsEditing(false);
  };

  return (
    <Form.Root action={handleAction}>
      {isEditing ? (
        <div>
          <InputField
            label={label}
            name={name}
            type={type}
            // defaultValue={value}
            defaultValue={values?.get(name) as string}
            isLoading={isPending}
            error={errors?.get(name)}
          />
          <Button color="violet" type="submit" loading={isPending}>
            Save
          </Button>
          <Button onClick={handleCancel} color="red">
            Cancel
          </Button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>{value || "Click to edit"}</div>
      )}
    </Form.Root>
  );
};

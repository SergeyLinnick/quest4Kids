"use client";

import { editChildAccountById } from "@repo/api";
import { InlineEdit } from "@repo/ui";
import { useActionState } from "react";

type InlineEditProfileProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  value: string;
  id: string;
};

export const InlineEditProfile = ({
  label,
  name,
  type = "text",
  value = "",
  id,
}: InlineEditProfileProps) => {
  const formData = new FormData();
  formData.set(name, value);
  const initialState = { errors: new Map(), values: formData, id };

  const [state, formAction, isPending] = useActionState(
    editChildAccountById,
    initialState,
  );

  const { errors, values } = state;

  return (
    <InlineEdit
      label={label}
      name={name}
      type={type}
      value={value}
      errors={errors}
      isPending={isPending}
      values={values || formData}
      formAction={formAction}
    />
  );
};

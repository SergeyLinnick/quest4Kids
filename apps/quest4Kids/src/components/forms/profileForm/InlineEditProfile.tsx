"use client";

import { updateProfile } from "@repo/api";
import { InlineEdit } from "@repo/ui";
import { useActionState } from "react";

type InlineEditProfileProps = {
  label: string;
  name: string;
  type: "text" | "email" | "password";
  value: string;
  id: string;
  isParentProfile: boolean;
  isDisabled?: boolean;
};

export const InlineEditProfile = ({
  label,
  name,
  type = "text",
  value = "",
  id,
  isParentProfile,
  isDisabled,
}: InlineEditProfileProps) => {
  const formData = new FormData();
  formData.set(name, value);
  const initialState = {
    errors: new Map(),
    values: formData,
    id,
    isParentProfile,
  };

  const [state, formAction, isPending] = useActionState(
    updateProfile,
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
      isDisabled={isDisabled}
    />
  );
};

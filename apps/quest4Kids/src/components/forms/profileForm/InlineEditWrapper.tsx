"use client";

import { editChildAccountById } from "@repo/api";
import { InlineEdit } from "@repo/ui";
import { useActionState } from "react";

type InlineEditWrapperProps = {
  initialValue: string;
  id: string;
};

export const InlineEditWrapper = ({
  initialValue,
  id,
}: InlineEditWrapperProps) => {
  const formData = new FormData();
  formData.set("name", initialValue);
  const initialState = { errors: new Map(), values: formData, id };

  const [state, formAction, isPending] = useActionState(
    editChildAccountById,
    initialState,
  );

  const { errors, values } = state;

  return (
    <InlineEdit
      label="Name"
      value={initialValue}
      name="name"
      type="text"
      errors={errors}
      isPending={isPending}
      values={values || formData}
      formAction={formAction}
    />
  );
};

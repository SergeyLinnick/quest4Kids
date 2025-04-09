"use client";

import { TASK_LABELS } from "@repo/api";
import { SelectField } from "@repo/ui-tw";

interface TaskLabelsSelectProps {
  label?: string;
  isLoading: boolean;
  values: FormData | undefined;
  errors?: Map<string, string>;
  onChange?: (value: string) => void;
}

export const TaskLabelsSelect = ({
  label = "",
  isLoading,
  values,
  errors,
  onChange,
}: TaskLabelsSelectProps) => {
  const labelsOptions = Object.values(TASK_LABELS).map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <SelectField
      isLoading={isLoading}
      label={label}
      defaultValue={values?.get("labels") as string}
      error={errors?.get?.("labels")}
      name="labels"
      options={labelsOptions}
      classNameTrigger="w-full"
      onChange={onChange}
    />
  );
};

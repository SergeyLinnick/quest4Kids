"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-tw";

interface SelectFieldProps {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  classNameTrigger?: string;
}
/**
 * Component for server actions forms
 *
 */
export function SelectField({
  name,
  placeholder = "Select an option",
  options,
  defaultValue,
  onChange,
  disabled,
  classNameTrigger,
}: SelectFieldProps) {
  const [selected, setSelected] = useState(defaultValue || "");

  const handleChange = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <>
      <Select value={selected} onValueChange={handleChange} disabled={disabled}>
        <SelectTrigger className={classNameTrigger}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <input type="hidden" name={name} value={selected} />
    </>
  );
}

"use client";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui-tw";
import { Skeleton } from "../skeleton";

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  isLoading?: boolean;
  options: { label: string; value: string }[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  classNameTrigger?: string;
  error: string | undefined;
}
/**
 * Component for server actions forms
 *
 */
export function SelectField({
  name,
  label,
  isLoading,
  placeholder = "Select an option",
  options,
  defaultValue,
  value,
  onChange,
  disabled,
  classNameTrigger,
  error,
}: SelectFieldProps) {
  const [selected, setSelected] = useState(defaultValue || "");

  const actualValue = value !== undefined ? value : selected;

  const handleChange = (val: string) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <>
      <label
        htmlFor={name}
        className="flex items-center gap-2 text-sm leading-none  select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {label}
      </label>

      {isLoading ? (
        <Skeleton className="w-full h-[38px]" />
      ) : (
        <>
          <Select
            value={actualValue}
            onValueChange={handleChange}
            disabled={disabled}
          >
            <SelectTrigger id={name} className={classNameTrigger}>
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
          {error && <p className="text-destructive text-sm">{error}</p>}
        </>
      )}
      <input type="hidden" name={name} value={actualValue} />
    </>
  );
}

import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Textarea } from "./textarea";

type FormFieldProps = {
  as?: "input" | "textarea";
  name: string;
  placeholder?: string;
  label?: string;
  description?: string;
  control: Control<FieldValues, FieldPath<FieldValues>>;
};

export const FormField = ({
  as = "input",
  name,
  placeholder,
  label,
  description,
  control,
}: FormFieldProps) => {
  return (
    <FormFieldComponent
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {as === "input" ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea placeholder={placeholder} {...field} />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

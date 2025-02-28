import { Skeleton, Text, TextField } from "@radix-ui/themes";
import { Form } from "radix-ui";
import { inputType, RegisterType } from "../../types";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  register: RegisterType;
  isLoading?: boolean;
  error?: string;
  type?: inputType;
}

export const FormField = ({
  name,
  label = "",
  placeholder = "",
  register,
  isLoading = false,
  error = "",
  type = "text",
}: FormFieldProps) => {
  return (
    <Form.Field name={name}>
      <Form.Label>{label}</Form.Label>
      <Skeleton loading={isLoading}>
        <Form.Control asChild>
          <TextField.Root
            placeholder={placeholder}
            variant="soft"
            size="3"
            color={error ? "red" : "violet"}
            {...register}
            type={type}
          />
        </Form.Control>
      </Skeleton>
      {error && (
        <Form.Message asChild>
          <Text color="red">{error}</Text>
        </Form.Message>
      )}
    </Form.Field>
  );
};

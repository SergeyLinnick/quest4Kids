import { Flex, Skeleton, Text, TextArea, TextField } from "@radix-ui/themes";
import { Form } from "radix-ui";

interface InputFieldProps {
  isLoading?: boolean;
  label: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  as?: "input" | "textarea";
  name: string;
  type?: "text" | "email" | "password";
  readOnly?: boolean;
}

export const InputField = ({
  isLoading = false,
  label,
  placeholder,
  value,
  defaultValue = "",
  readOnly,
  error,
  as = "input",
  name,
  type = "text",
}: InputFieldProps) => {
  return (
    <Flex direction="column" gap="2" asChild>
      <Form.Field name={name}>
        <Form.Label>{label}</Form.Label>
        <Skeleton loading={isLoading}>
          <Form.Control asChild>
            {as === "input" ? (
              <TextField.Root
                size="3"
                defaultValue={defaultValue}
                type={type}
                value={value}
                readOnly={readOnly}
                placeholder={placeholder}
              />
            ) : (
              <TextArea size="3" defaultValue={defaultValue} />
            )}
          </Form.Control>
        </Skeleton>
        {error && (
          <Form.Message asChild>
            <Text color="red">{error}</Text>
          </Form.Message>
        )}
      </Form.Field>
    </Flex>
  );
};

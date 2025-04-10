import { CheckboxField } from "./checkboxField";
import { FormField, FormItem, FormMessage } from "./form";

type CheckboxFieldsProps = {
  name: string;
  control: any;
  items: {
    label: string;
    description?: string;
    id: string;
  }[];
};

export const CheckboxFields = ({
  control,
  name,
  items,
}: CheckboxFieldsProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          {items.map((item) => (
            <CheckboxField
              key={item.id}
              label={item.label}
              control={control}
              name={name}
              id={item.id}
              multiple
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

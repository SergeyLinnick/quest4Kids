import { Checkbox } from "./checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type CheckboxFieldProps = {
  label: string;
  control: any;
  name: string;
  id: string;
  /**
   * Indicates whether multiple checkboxes can be selected.
   * If true, the user can select multiple options. And the value will be an array of selected options.
   * {fieldName: ["option1", "option2"]}
   * If false, only one option can be selected.
   * {fieldName: true}
   * @type {boolean}
   */
  multiple?: boolean;
};

export const CheckboxField = ({
  label,
  control,
  name,
  id,
  multiple = false,
}: CheckboxFieldProps) => {
  return (
    <FormField
      key={id}
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            key={id}
            className="flex flex-row items-start space-x-0 space-y-0"
          >
            <FormControl>
              {multiple ? (
                <Checkbox
                  checked={field.value?.includes(id)}
                  onCheckedChange={(checked) => {
                    return checked
                      ? field.onChange([...(field.value || []), id])
                      : field.onChange(
                          (field.value || []).filter(
                            (value: string) => value !== id,
                          ),
                        );
                  }}
                />
              ) : (
                <>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FormMessage />
                </>
              )}
            </FormControl>
            <FormLabel className="font-normal pt-[3px]">{label}</FormLabel>
          </FormItem>
        );
      }}
    />
  );
};

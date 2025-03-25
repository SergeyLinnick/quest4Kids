"use client";

import { Flex, RadioCards, Text } from "@radix-ui/themes";
import { TASK_STATUS } from "@repo/api";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { Form as FormRadix } from "radix-ui";

interface FilterTaskFormProps {
  status: string;
}

export const FilterTaskForm = ({ status = "" }: FilterTaskFormProps) => {
  const [, setStatus] = useQueryState("status");
  const router = useRouter();

  const handleStatusChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? null : e.target.value;
    await setStatus(value);
    router.refresh();
  };

  return (
    <FormRadix.Root>
      <FormRadix.Field name="status">
        <RadioCards.Root
          name="status"
          columns="1"
          onChange={handleStatusChange}
          size="1"
          defaultValue={status}
        >
          <RadioCards.Item value="">
            <Flex direction="column" width="100%">
              <Text weight="bold">All</Text>
            </Flex>
          </RadioCards.Item>
          {Object.values(TASK_STATUS).map((status) => (
            <RadioCards.Item value={status.name} key={status.name}>
              <Flex direction="column" width="100%">
                <Text weight="bold">{status.value}</Text>
              </Flex>
            </RadioCards.Item>
          ))}
        </RadioCards.Root>
      </FormRadix.Field>
    </FormRadix.Root>
  );
};

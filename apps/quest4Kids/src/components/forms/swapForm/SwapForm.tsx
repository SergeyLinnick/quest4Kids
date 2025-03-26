"use client";

import { Dialog, Flex, Text } from "@radix-ui/themes";
import {
  FormState,
  initialState,
  swapPoints,
  swapPointSchema,
} from "@repo/api";
import { Button, InputField } from "@repo/ui";
import { Form } from "radix-ui";
import { useActionState, useState } from "react";
import z from "zod";

interface SwapFormProps {
  name: string;
  availablePoints: number;
  childId: string;
}

const SwapForm: React.FC<SwapFormProps> = ({
  name,
  availablePoints,
  childId,
}: SwapFormProps) => {
  const [points, setPoints] = useState(availablePoints);
  const [clientError, setClientError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    swapPoints,
    initialState,
  );

  const handlePointsChange = ({ target }: { target: HTMLInputElement }) => {
    const value = Number(target.value);
    setPoints(value);

    try {
      swapPointSchema(availablePoints).parse({ points: value, childId });
      setClientError("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setClientError(error?.errors[0]?.message || "Invalid points");
      }
    }
  };

  return (
    <>
      <Dialog.Title>
        {name} swaps {points}&nbsp;coins for a reward
      </Dialog.Title>
      <Form.Root action={formAction}>
        <Flex direction="column" gap="2">
          <InputField
            label="Coins"
            defaultValue={points.toString()}
            placeholder="Enter coins to swap"
            onChange={handlePointsChange}
            name="points"
            type="number"
          />
          <Text color="red">{clientError}</Text>
        </Flex>
        <input type="hidden" name="childId" value={childId} />

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Swapping..." : "Swap"}
            </Button>
          </Dialog.Close>
        </Flex>
      </Form.Root>
    </>
  );
};

export default SwapForm;

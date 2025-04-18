"use client";

import { Dialog, Flex, Text } from "@radix-ui/themes";
import {
  FormState,
  initialState,
  swapPoints,
  swapPointSchema,
} from "@repo/api";
import { Button, InputField } from "@repo/ui";
import confetti from "canvas-confetti";
import { Form } from "radix-ui";
import { useActionState, useEffect, useState } from "react";
import z from "zod";
import { SuccessCard } from "./SuccessCard";
interface SwapFormProps {
  name: string;
  availablePoints: number;
  childId: string;
  setOpen: (open: boolean) => void;
}

const SwapForm: React.FC<SwapFormProps> = ({
  name,
  availablePoints,
  childId,
  setOpen,
}: SwapFormProps) => {
  const [points, setPoints] = useState(availablePoints);
  const [clientError, setClientError] = useState<string | null>(null);

  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    swapPoints,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      confetti({
        particleCount: 150,
        spread: 60,
      });
      setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, [state.success, setOpen]);

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

  const getContent = () => {
    if (state.success && availablePoints === 0) {
      return <SuccessCard text="No coins left — time to earn some more!" />;
    }

    if (state.success) {
      return <SuccessCard text="Coins exchanged." />;
    }

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

            <Button
              type="submit"
              disabled={isPending || !!clientError}
              color={state.success ? "green" : "violet"}
            >
              {isPending ? "Swapping..." : "Swap"}
            </Button>
          </Flex>
        </Form.Root>
      </>
    );
  };

  return getContent();
};

export default SwapForm;

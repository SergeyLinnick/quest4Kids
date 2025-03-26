"use client";

import { Dialog } from "@radix-ui/themes";
import { IChild } from "@repo/api";
import { Button, SwapIcon } from "@repo/ui";
import { useState } from "react";
import SwapForm from "./SwapForm";

interface SwapFormProps {
  user: IChild;
  isDisabled?: boolean;
}

export const SwapModal = ({ user, isDisabled = false }: SwapFormProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="outline" disabled={isDisabled}>
          Swap
          <SwapIcon />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="300px">
        <SwapForm
          name={user.name}
          availablePoints={user.availablePoints}
          childId={user.id}
          setOpen={setOpen}
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

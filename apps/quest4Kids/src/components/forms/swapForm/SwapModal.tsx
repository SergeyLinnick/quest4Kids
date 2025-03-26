import { Dialog } from "@radix-ui/themes";
import { IChild } from "@repo/api";
import { Button, SwapIcon } from "@repo/ui";
import SwapForm from "./SwapForm";

interface SwapFormProps {
  user: IChild;
  isDisabled?: boolean;
}

export const SwapModal = ({ user, isDisabled = false }: SwapFormProps) => {
  return (
    <Dialog.Root>
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
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

"use client";

import { Dialog } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

export function Modal({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog.Root defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description></Dialog.Description>
        {children}
      </Dialog.Content>
    </Dialog.Root>
  );
}

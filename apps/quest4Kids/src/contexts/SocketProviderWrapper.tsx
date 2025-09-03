"use client";

import { INotification } from "@repo/api";
import { SocketProvider } from "@repo/chat";
import { useSession } from "next-auth/react";

export const SocketProviderWrapper = ({
  children,
  onNotification,
}: {
  children: React.ReactNode;
  onNotification?: (notification: INotification) => void;
}) => {
  const { data: session } = useSession();

  if (!session?.user?.id) return children;

  return (
    <SocketProvider userId={session.user.id} onNotification={onNotification}>
      {children}
    </SocketProvider>
  );
};

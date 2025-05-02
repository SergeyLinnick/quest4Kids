"use client";

import { INotification } from "@repo/api";
import { useSession } from "@repo/auth";
import { SocketProvider } from "@repo/chat";

export const SocketProviderWrapper = ({
  children,
  onNotification,
}: {
  children: React.ReactNode;
  onNotification?: (notification: INotification) => void;
}) => {
  const { session } = useSession();

  if (!session?.user?.id) return children;

  return (
    <SocketProvider userId={session.user.id} onNotification={onNotification}>
      {children}
    </SocketProvider>
  );
};

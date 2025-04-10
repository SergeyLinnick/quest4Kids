import { SessionProvider as SessionProviderNextAuth } from "next-auth/react";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SessionProviderNextAuth>{children}</SessionProviderNextAuth>;
};

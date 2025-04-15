import { SessionProvider as SessionProviderNextAuth } from "next-auth/react";

export const SessionProvider = ({
  children,
  session,
  basePath,
}: {
  children: React.ReactNode;
  session?: any;
  basePath?: string;
}) => {
  return (
    <SessionProviderNextAuth session={session} basePath={basePath}>
      {children}
    </SessionProviderNextAuth>
  );
};

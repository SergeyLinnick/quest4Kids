import { useSession as useSessionNextAuth } from "next-auth/react";

export const useSession = () => {
  const { data: session } = useSessionNextAuth();

  return session;
};

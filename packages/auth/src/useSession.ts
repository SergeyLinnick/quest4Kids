import { useSession as useSessionNextAuth } from "next-auth/react";

export const useSession = () => {
  const { data: session, status, update } = useSessionNextAuth();

  return { session, status, update };
};

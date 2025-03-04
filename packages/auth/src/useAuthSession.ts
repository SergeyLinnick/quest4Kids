import { useSession } from "next-auth/react";

export const useAuthSession: any = () => {
  const { data: session, status } = useSession();
  return { session, status };
};

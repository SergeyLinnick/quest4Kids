import { authOptions } from "@repo/auth";
import NextAuth from "next-auth";

const { auth } = NextAuth(authOptions);

export const requireAuth = async () => {
  const session = auth(authOptions);

  if (!session) {
    throw new Error("Not authenticated");
  }

  return session;
};

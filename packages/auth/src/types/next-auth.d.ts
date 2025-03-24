import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    role: string;
    accessToken?: string;
    refreshToken?: string;
    image?: string;
    expiresAt?: number;
  }

  interface Session {
    user?: User & DefaultSession["user"];
    accessToken: string;
    error: string;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    error?: string;
  }
}

export type { JWT, Session, User };

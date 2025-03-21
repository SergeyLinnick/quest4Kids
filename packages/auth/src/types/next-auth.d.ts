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
  }

  interface Session {
    user?: User & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

export type { JWT, Session, User };

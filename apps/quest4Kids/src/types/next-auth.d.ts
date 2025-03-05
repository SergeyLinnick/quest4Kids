import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
    accessToken?: string;
  }

  interface Session {
    user?: User & DefaultSession["user"];
  }

  interface JWT {
    accessToken?: string;
  }
}

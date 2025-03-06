import { saltAndHashPassword } from "@repo/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { PAGE_PATH } from "./consts/pagePath";
import { signInSchema } from "./lib/zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { handlers, signIn, auth, signOut }: any = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          const response = await fetch(
            `https://quest4kids-a7fd24f91954.herokuapp.com/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password: pwHash }),
            },
          );

          const user = await response.json();

          if (!response.ok || !user) {
            throw new Error("Invalid credentials");
          }

          return {
            email,
            accessToken: user.accessToken,
          };
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + PAGE_PATH.DASHBOARD;
    },
  },
});

import { saltAndHashPassword } from "@repo/utils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { handlers, signIn, auth, signOut }: any = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let user: any = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          const pwHash = saltAndHashPassword(password);

          // logic to verify if the user exists
          user = await fetch(
            `https://quest4kids-a7fd24f91954.herokuapp.com/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password: pwHash }),
            },
          );

          if (!user) {
            throw new Error("Invalid credentials.");
          }

          // return JSON object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect to /tasks after sign-in
      return baseUrl + "/tasks";
    },
  },
});

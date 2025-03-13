import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const api = process.env.NEXT_PUBLIC_API_URL;

export const { handlers, signIn, auth, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials;
          // TODO add validation

          const loginResponse = await fetch(`${api}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const login = await loginResponse.json();

          if (!loginResponse.ok || !login) {
            throw new Error("Invalid credentials");
          }

          const profileResponse = await fetch(`${api}/auth/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${login.accessToken}`,
            },
          });

          const profile = await profileResponse.json();

          if (!profileResponse.ok || !profile) {
            throw new Error("Failed to fetch profile");
          }

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            accessToken: login.accessToken,
            image: "avatar",
          };
        } catch (error) {
          if (error instanceof Error) {
            throw new Error("Login Error");
          }
          throw new Error("Login failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 59, // 59 minutes
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      if (token.role) {
        session.user.role = token.role;
      }
      if (token.id) {
        session.user.id = token.id;
      }

      return session;
    },
  },
});

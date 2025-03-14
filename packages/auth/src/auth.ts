import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const api = process.env.NEXT_PUBLIC_API_URL;

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

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

          const loginResponse = await fetch(`${api}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!loginResponse.ok) {
            throw new Error("Invalid credentials");
          }

          const login = await loginResponse.json();

          const profileResponse = await fetch(`${api}/auth/profile`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${login.accessToken}`,
            },
          });

          if (!profileResponse.ok) {
            throw new Error("Failed to fetch profile");
          }

          const profile = await profileResponse.json();

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            accessToken: login.accessToken,
            image: "avatar",
          };
        } catch {
          throw new InvalidLoginError();
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
  pages: {
    signIn: "/signin",
    newUser: "/signup",
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
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});

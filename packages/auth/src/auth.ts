import NextAuth, { CredentialsSignin } from "next-auth";
import {
  decode as decodeJwtToken,
  encode as encodeJwtToken,
  getToken as getJwtToken,
} from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { EXPIRES_IN } from "./refreshToken";

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

          console.log("login ===>", login.refreshToken);

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

          const avatarResponse = await fetch(
            `${api}/user/${profile.id}/avatar`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${login.accessToken}`,
              },
            },
          );

          const avatar = await avatarResponse.text();

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            accessToken: login.accessToken,
            refreshToken: login.refreshToken,
            image: avatar || "",
            expiresAt: Date.now() + EXPIRES_IN,
          };
        } catch {
          throw new InvalidLoginError();
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour,
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour,
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.id = user.id;
        token.expiresAt = user.expiresAt;
      }

      if (Date.now() < (token.expiresAt as number)) {
        return token;
      }

      // return await refreshToken(token);
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

      if (token.expiresAt) {
        session.user.expiresAt = token.expiresAt;
      }

      if (token.refreshToken) {
        session.user.refreshToken = token.refreshToken;
      }

      if (token.error) {
        session.user.error = token.error;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});

export const getToken = getJwtToken;
export const encode = encodeJwtToken;
export const decode = decodeJwtToken;

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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

          const loginResponse = await fetch(
            `https://quest4kids-a7fd24f91954.herokuapp.com/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            },
          );

          const user = await loginResponse.json();

          if (!loginResponse.ok || !user) {
            throw new Error("Invalid credentials");
          }

          const profileResponse = await fetch(
            `https://quest4kids-a7fd24f91954.herokuapp.com/auth/profile`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.accessToken}`, // Attach access token for authorization
              },
            },
          );

          const profile = await profileResponse.json();

          if (!profileResponse.ok || !profile) {
            throw new Error("Failed to fetch profile");
          }

          return {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role,
            accessToken: user.accessToken,
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
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.role = user.role;
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

      return session;
    },
    // Redirect to "path" after sigIn and signOut
    async redirect({ baseUrl }) {
      return baseUrl + "/";
    },
  },
});

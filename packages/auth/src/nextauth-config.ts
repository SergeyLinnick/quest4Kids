import type { NextAuthConfig } from "next-auth";
import Zitadel from "next-auth/providers/zitadel";
import { readAuthEnv } from "./env";
import { type PersistedJwt, refreshAccessToken } from "./token-refresh";

export function makeAuthConfig(): NextAuthConfig {
  const env = readAuthEnv();

  return {
    session: { strategy: "jwt" },
    trustHost: true,
    providers: [
      Zitadel({
        issuer: env.ZITADEL_ISSUER,
        clientId: env.ZITADEL_CLIENT_ID,
        clientSecret: env.ZITADEL_CLIENT_SECRET,
        authorization: {
          params: {
            scope:
              "openid email profile api.tasks.read api.tasks.write urn:zitadel:iam:org:project:id:335510874452221485:aud offline_access",
            customQueryParams: {
              claims: JSON.stringify({
                id_token: {},
                userinfo: {
                  email: { essential: true },
                  email_verified: { essential: true },
                  given_name: { essential: true },
                  family_name: { essential: true },
                },
              }),
            },
          },
        },
      }),
    ],
    callbacks: {
      async redirect({
        url,
        baseUrl,
      }: {
        url: string;
        baseUrl: string;
      }): Promise<string> {
        const defaultRedirectPath = "/dashboard";

        if (url === baseUrl) {
          return `${baseUrl}${defaultRedirectPath}`;
        }

        if (url.startsWith("/")) {
          return `${baseUrl}${url}`;
        }

        try {
          const targetUrl = new URL(url);
          if (targetUrl.origin === baseUrl) {
            return url;
          }
        } catch {
          // ignore invalid URL
        }

        return url;
      },
      async jwt({ token, account }) {
        const persistedJwt = token as unknown as PersistedJwt;

        if (account?.access_token) {
          const nowMs = Date.now();
          const providerExpiryMs =
            typeof account.expires_at === "number"
              ? account.expires_at * 1000
              : nowMs + 3_600_000;
          const safetyBufferMs = 30_000;

          return {
            accessToken: String(account.access_token),
            refreshToken:
              typeof account.refresh_token === "string"
                ? account.refresh_token
                : persistedJwt.refreshToken,
            idToken:
              typeof account.id_token === "string"
                ? account.id_token
                : persistedJwt.idToken,
            accessTokenExpiresAt: providerExpiryMs - safetyBufferMs,
          } satisfies PersistedJwt;
        }

        if (
          persistedJwt.accessToken &&
          typeof persistedJwt.accessTokenExpiresAt === "number" &&
          Date.now() < persistedJwt.accessTokenExpiresAt
        ) {
          return persistedJwt;
        }

        try {
          return await refreshAccessToken(persistedJwt, env);
        } catch {
          return { accessTokenExpiresAt: 0 } satisfies PersistedJwt;
        }
      },

      async session({ session, token }) {
        const persistedJwt = token as unknown as PersistedJwt;
        console.log('persistedJwt', persistedJwt);
        return {
          ...session,
          accessToken: persistedJwt.accessToken ?? "",
          idToken: persistedJwt.idToken,
          expiresAt: persistedJwt.accessTokenExpiresAt,
        };
      },
    },
  };
}

const api = process.env.NEXT_PUBLIC_API_URL;
export const EXPIRES_IN = 60 * 60 * 1000; // 1 hour

let currentRefreshPromise: Promise<any> | null = null;

export async function refreshToken(token: any) {
  if (currentRefreshPromise) {
    return currentRefreshPromise;
  }

  try {
    currentRefreshPromise = (async () => {
      const res = await fetch(`${api}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token.refreshToken }),
      });

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(`Failed to refresh token: ${responseText}`);
      }

      const refreshed = JSON.parse(responseText);

      return {
        ...token,
        accessToken: refreshed.accessToken,
        accessTokenExpires: Date.now() + EXPIRES_IN,
        refreshToken: refreshed.refreshToken,
      };
    })();

    return await currentRefreshPromise;
  } catch (error) {
    console.error("Refresh token error:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  } finally {
    currentRefreshPromise = null;
  }
}

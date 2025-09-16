import { getTokenEndpoint } from "./oidc-discovery";
import type { AuthEnv } from "./env";

export type PersistedJwt = {
	accessToken?: string;
	refreshToken?: string;
	accessTokenExpiresAt?: number;
	idToken?: string;
};

export type RefreshTokenResponse = {
	access_token?: string;
	id_token?: string;
	refresh_token?: string;
	token_type?: string;
	expires_in?: number;
	scope?: string;
};

export async function refreshAccessToken(
	currentJwt: PersistedJwt,
	environment: AuthEnv,
): Promise<PersistedJwt> {
	if (!currentJwt.refreshToken) {
		throw new Error("Missing refresh_token to perform token refresh.");
	}

	const tokenEndpoint = await getTokenEndpoint(environment.ZITADEL_ISSUER);

	const formBody = new URLSearchParams({
		grant_type: "refresh_token",
		refresh_token: currentJwt.refreshToken,
		client_id: environment.ZITADEL_CLIENT_ID,
	});
	if (environment.ZITADEL_CLIENT_SECRET) {
		formBody.set("client_secret", environment.ZITADEL_CLIENT_SECRET);
	}

	const response = await fetch(tokenEndpoint, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: formBody,
	});
	if (!response.ok) {
		throw new Error(`Refresh request failed. HTTP ${response.status}.`);
	}

	const payload = (await response.json()) as Partial<RefreshTokenResponse>;
	if (typeof payload.access_token !== "string") {
		throw new Error("Refresh response does not contain access_token.");
	}

	const issuedAtMs = Date.now();
	const expiresInSeconds =
		typeof payload.expires_in === "number" && Number.isFinite(payload.expires_in)
			? payload.expires_in
			: 3600;
	const safetyBufferMs = 30_000;

	return {
		...currentJwt,
		accessToken: payload.access_token,
		idToken: typeof payload.id_token === "string" ? payload.id_token : currentJwt.idToken,
		refreshToken:
			typeof payload.refresh_token === "string" ? payload.refresh_token : currentJwt.refreshToken,
		accessTokenExpiresAt: issuedAtMs + expiresInSeconds * 1000 - safetyBufferMs,
	};
}

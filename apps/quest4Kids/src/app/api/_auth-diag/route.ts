import { NextResponse } from "next/server";
import { makeAuthConfig } from "@repo/auth/config";


export const dynamic = "force-dynamic";

export async function GET() {
	const env = {
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		ZITADEL_ISSUER: process.env.ZITADEL_ISSUER,
		ZITADEL_CLIENT_ID: process.env.ZITADEL_CLIENT_ID,
		HAS_ZITADEL_CLIENT_SECRET: !!process.env.ZITADEL_CLIENT_SECRET,
	};

	let wellKnownOk = false;
	let wellKnownErr: string | undefined;
	let tokenEndpoint: string | undefined;

	try {
		if (!env.ZITADEL_ISSUER) throw new Error("ZITADEL_ISSUER missing");
		const r = await fetch(`${env.ZITADEL_ISSUER}/.well-known/openid-configuration`, {
			cache: "no-store",
		});
		wellKnownOk = r.ok;
		const j = await r.json();
		tokenEndpoint = j?.token_endpoint;
	} catch (e: any) {
		wellKnownOk = false;
		wellKnownErr = e?.message || String(e);
	}

	const providers = (makeAuthConfig().providers ?? []).map((p: any) => ({
		id: p?.id ?? p?.name ?? "unknown",
		type: p?.type,
		issuer: p?.options?.issuer,
		scope: p?.options?.authorization?.params?.scope,
		customQueryParams: p?.options?.authorization?.params?.customQueryParams,
	}));

	return NextResponse.json({
		env,
		wellKnown: { ok: wellKnownOk, tokenEndpoint, error: wellKnownErr },
		providers,
		notes: [
			"ENV.* не должны быть undefined/false",
			"wellKnown.ok = true и есть tokenEndpoint",
			"providers[0].issuer должен равняться ZITADEL_ISSUER (без / в конце)",
			"scope содержит offline_access",
			"Если все ок — /api/auth/providers и /api/auth/signin должны работать",
		],
	});
}

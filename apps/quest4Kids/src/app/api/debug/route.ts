export async function GET() {
	return Response.json({
		issuer: process.env.ZITADEL_ISSUER,
		clientId: process.env.ZITADEL_CLIENT_ID,
		hasSecret: !!process.env.ZITADEL_CLIENT_SECRET,
	});
}
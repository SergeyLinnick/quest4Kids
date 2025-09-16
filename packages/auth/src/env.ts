export type AuthEnv = {
  readonly ZITADEL_ISSUER: string;
  readonly ZITADEL_CLIENT_ID: string;
  readonly ZITADEL_CLIENT_SECRET?: string;
};

export function readAuthEnv(): AuthEnv {
  console.log("[auth] ZITADEL_ISSUER =", process.env.ZITADEL_ISSUER);

  const { ZITADEL_ISSUER, ZITADEL_CLIENT_ID, ZITADEL_CLIENT_SECRET } =
    process.env;

  if (!ZITADEL_ISSUER || !/^https?:\/\/.+/.test(ZITADEL_ISSUER)) {
    throw new Error("ZITADEL_ISSUER must be a valid URL (https://…).");
  }
  if (!ZITADEL_CLIENT_ID) {
    throw new Error("ZITADEL_CLIENT_ID is required.");
  }

  return {
    ZITADEL_ISSUER,
    ZITADEL_CLIENT_ID,
    ZITADEL_CLIENT_SECRET,
  };
}

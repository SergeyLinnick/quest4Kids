export type OidcWellKnown = { token_endpoint: string };

const wellKnownCache = new Map<string, OidcWellKnown>();

export async function getTokenEndpoint(issuerUrl: string): Promise<string> {
  const cached: OidcWellKnown | undefined = wellKnownCache.get(issuerUrl);
  if (cached) return cached.token_endpoint;

  const response = await fetch(
    `${issuerUrl}/.well-known/openid-configuration`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load OIDC discovery. HTTP ${response.status}.`);
  }

  const json = (await response.json()) as Partial<OidcWellKnown>;
  if (!json.token_endpoint) {
    throw new Error("OIDC discovery document has no token_endpoint.");
  }

  const wellKnown: OidcWellKnown = { token_endpoint: json.token_endpoint };
  wellKnownCache.set(issuerUrl, wellKnown);

  return wellKnown.token_endpoint;
}

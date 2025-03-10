import { auth } from "@repo/auth";

type FetchProps = {
  url: string;
  method?: string;
  headers?: HeadersInit;
  options?: RequestInit;
};

class HttpClient {
  protected handleError(response: Response) {
    const status = response.status;

    if (status === 401) {
      console.error(
        `Fetch: Not Found (401): ${response?.statusText || "Unauthorized, logging out"}`,
      );
      throw new Error(`Fetch: Not Found (401): ${response?.statusText}`);
    }

    if (status === 404) {
      console.error(
        `Fetch: Not Found (404): ${response?.statusText || "The requested resource was not found."}`,
      );
      throw new Error(`Fetch: Not Found (404):  ${response?.statusText}`);
    }

    if (status === 409) {
      console.error(
        `Fetch: Conflict (409): ${response?.statusText || "The request conflicts with the current state."}`,
      );
      throw new Error(`Fetch: Conflict (409): ${response?.statusText}`);
    }

    if (status === 500) {
      console.error(
        `Fetch: Internal Server Error (500): ${response?.statusText || "Something went wrong on the server."}`,
      );
      throw new Error(
        `Fetch: Internal Server Error (500): ${response?.statusText}`,
      );
    }

    throw new Error(`HTTP Error ${status} ${response?.statusText}`);
  }

  protected async fetch({
    url,
    method = "GET",
    headers,
    ...options
  }: FetchProps) {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        ...options,
      });

      if (!response.ok) {
        this.handleError(response);
      }

      const text = await response.text();
      if (!text) return {};
      return JSON.parse(text);
    } catch (error) {
      throw new Error(`Fetch error: ====>: ${error}`);
    }
  }
}

class AuthHttpClient extends HttpClient {
  async fetch({ url, method, ...options }: FetchProps) {
    const session = await auth();
    const token = session?.user?.accessToken;

    return super.fetch({
      url,
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      ...options,
    });
  }
}

class PublicHttpClient extends HttpClient {
  async fetch({ url, method, ...options }: FetchProps) {
    return super.fetch({ url, method, ...options });
  }
}

export const authHttpClient = new AuthHttpClient();
export const publicHttpClient = new PublicHttpClient();

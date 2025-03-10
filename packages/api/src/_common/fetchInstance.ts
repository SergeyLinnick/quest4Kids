import { auth } from "@repo/auth";
import { getErrorMessage } from "@repo/utils";

const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  CONFLICT: 409,
  SERVER_ERROR: 500,
} as const;

interface FetchProps {
  url: string;
  method?: string;
  headers?: Record<string, string>;
}

class HttpClient {
  protected async handleError(response: Response): Promise<never> {
    let errorMessage: string;

    try {
      const errorText = await response.text();
      const errorJson = JSON.parse(errorText);
      errorMessage = getErrorMessage(errorJson) || response.statusText;
    } catch {
      errorMessage = response.statusText || "Unknown error";
    }

    const status = response.status;
    const baseError = `HTTP Error ${status}: ${errorMessage}`;

    switch (status) {
      case HTTP_STATUS.UNAUTHORIZED:
        console.error(
          `Fetch: Unauthorized (401): ${errorMessage || "Unauthorized, logging out"}`,
        );
        throw new Error(`Fetch: Unauthorized (401): ${errorMessage}`);

      case HTTP_STATUS.NOT_FOUND:
        console.error(
          `Fetch: Not Found (404): ${errorMessage || "The requested resource was not found."}`,
        );
        throw new Error(`Fetch: Not Found (404): ${errorMessage}`);

      case HTTP_STATUS.BAD_REQUEST:
        console.error(
          `Fetch: Bad Request (400): ${errorMessage || "Invalid request parameters."}`,
        );
        throw new Error(`Fetch: Bad Request (400): ${errorMessage}`);

      case HTTP_STATUS.CONFLICT:
        console.error(
          `Fetch: Conflict (409): ${errorMessage || "The request conflicts with the current state."}`,
        );
        throw new Error(`Fetch: Conflict (409): ${errorMessage}`);

      case HTTP_STATUS.SERVER_ERROR:
        console.error(
          `Fetch: Internal Server Error (500): ${errorMessage || "Something went wrong on the server."}`,
        );
        throw new Error(`Fetch: Internal Server Error (500): ${errorMessage}`);

      default:
        console.error(baseError);
        throw new Error(baseError);
    }
  }

  protected async fetch<T>({
    url,
    method = "GET",
    headers,
    ...options
  }: FetchProps): Promise<T> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

      const response = await fetch(url, {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        await this.handleError(response);
      }

      const text = await response.text();
      if (!text) return {} as T;

      try {
        return JSON.parse(text);
      } catch {
        return text as T;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Request timeout");
        }
        throw error;
      }
      throw new Error("Unknown error occurred");
    }
  }
}

class AuthHttpClient extends HttpClient {
  private retryCount = 0;
  private maxRetries = 3;

  async fetch<T>({ url, method, headers, ...options }: FetchProps): Promise<T> {
    try {
      const session = await auth();

      if (!session?.user?.accessToken) {
        throw new Error("No authentication token available");
      }

      return await super.fetch<T>({
        url,
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        ...options,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("401") &&
        this.retryCount < this.maxRetries
      ) {
        this.retryCount++;
        // Add logic to refresh the token here
        return this.fetch({ url, method, headers, ...options });
      }
      this.retryCount = 0;
      throw error;
    }
  }
}

class PublicHttpClient extends HttpClient {
  async fetch<T>({ url, method, ...options }: FetchProps): Promise<T> {
    return super.fetch<T>({ url, method, ...options });
  }
}

export const authHttpClient = new AuthHttpClient();
export const publicHttpClient = new PublicHttpClient();

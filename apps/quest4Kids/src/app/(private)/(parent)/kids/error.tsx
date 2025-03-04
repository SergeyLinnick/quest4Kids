"use client";

import { ApiError } from "@repo/api";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  if (error instanceof ApiError) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Try again</button>
      </div>
    );
  }

  return <div>Unexpected error</div>;
}

"use client";

type ErrorProps = {
  error: Error;
  reset?: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      {reset && <button onClick={reset}>Reset</button>}
    </div>
  );
}

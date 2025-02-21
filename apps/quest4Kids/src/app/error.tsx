"use client";

import { Button } from "@repo/ui";

type ErrorProps = {
	error: Error;
	reset?: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
	return (
		<main className="flex flex-col items-center justify-center gap-6">
			<h1 className="text-3xl font-semibold">Something went wrong!</h1>
			<p className="text-lg">{error.message}</p>

			{reset && <Button onClick={reset}>Try again</Button>}
		</main>
	);
}

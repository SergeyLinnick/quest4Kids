"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { Button } from "@repo/ui";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Flex justify="center" align="center">
      <Flex direction="column" gap="6" align="center">
        <Heading>Something went wrong!</Heading>
        <Text>{error.message}</Text>

        {reset && <Button onClick={reset}>Try again</Button>}
      </Flex>
    </Flex>
  );
}

"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { Button } from "@repo/ui";

type ErrorProps = {
  error: Error;
  reset?: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <Flex height="100vh" justify="center" align="center">
      <Flex direction="column" gap="6" align="center">
        <Heading>Something went wrong!</Heading>
        <Text>{error.message}</Text>

        {reset && <Button onClick={reset}>Try again</Button>}
      </Flex>
    </Flex>
  );
}

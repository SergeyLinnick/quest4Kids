import { Flex, Spinner } from "@radix-ui/themes";

export default function Loading() {
  return (
    <Flex align="center" justify="center" height="100%">
      Child loading
      <Spinner size="3" />
    </Flex>
  );
}

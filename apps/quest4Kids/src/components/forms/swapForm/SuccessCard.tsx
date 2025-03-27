import { Box, Text } from "@radix-ui/themes";

import { Flex } from "@radix-ui/themes";
import { CoinsIcon } from "@repo/ui";

export const SuccessCard = ({ text }: { text: string }) => {
  return (
    <Flex direction="column" gap="4" align="center">
      <Box>
        <CoinsIcon />
      </Box>
      <Text align="center">Well done!</Text>
      <Text align="center" color="gray">
        {text}
      </Text>
    </Flex>
  );
};

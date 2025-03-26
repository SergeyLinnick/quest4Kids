import { Box } from "@radix-ui/themes";

interface CoinsProps {
  available?: number;
  total?: number;
}

const Coins = ({ available = 0, total = 0 }: CoinsProps) => {
  return (
    <Box mt="3">
      <strong>{available}</strong>/{total} coins
    </Box>
  );
};

export default Coins;

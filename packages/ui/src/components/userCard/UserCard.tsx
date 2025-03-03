import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import styles from "./userCard.module.css";

interface UserCardProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  isLink?: boolean;
}

export const UserCard = ({ user, isLink = false }: UserCardProps) => {
  const { name, email, avatar } = user;
  const firstLetters = name.charAt(0) + name.charAt(1);

  return (
    <Card size="2" className={isLink ? styles.link : ""}>
      <Flex gap="4" align="center">
        <Avatar
          src={avatar}
          size="4"
          radius="full"
          fallback={firstLetters}
          color="indigo"
        />
        <Box>
          <Text as="div" weight="bold">
            {name}
          </Text>
          <Text as="div" color="gray">
            {email}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

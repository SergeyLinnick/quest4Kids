import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { getUserInitials } from "@repo/utils";
import Link from "next/link";
import { Avatar } from "../avatar/Avatar";
import Coins from "./Coins";
import styles from "./userCard.module.css";

interface UserCardProps {
  user: Record<string, any>;
  href?: string;
  children?: React.ReactNode;
}

export const UserCard = ({ user, href, children }: UserCardProps) => {
  const { name, email, avatar, availablePoints, totalEarnedPoints } = user;
  const initials = getUserInitials(name);

  const content = (
    <Flex gap="4" align="center">
      <Avatar fallback={initials} src={avatar} size={55} alt={name} />
      <Box>
        <Text as="div" weight="bold">
          {name}
        </Text>
        <Text as="div" color="gray">
          {email}
        </Text>
        <Coins available={availablePoints} total={totalEarnedPoints} />
      </Box>
    </Flex>
  );

  return (
    <Card size="3" className={href ? styles.link : ""}>
      {href ? <Link href={href}>{content}</Link> : content}
      {children}
    </Card>
  );
};

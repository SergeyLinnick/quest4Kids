import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { AddIcon } from "../..";
import styles from "./userCard.module.css";

interface AddUserCardProps {
  href: string;
}

export const AddUserCard = ({ href = "" }: AddUserCardProps) => {
  return (
    <Card size="3" className={styles.addCard} asChild>
      <Link href={href}>
        <Flex gap="4" align="center" justify="center" height="100%">
          <AddIcon />
          <Text>Add Kid</Text>
        </Flex>
      </Link>
    </Card>
  );
};

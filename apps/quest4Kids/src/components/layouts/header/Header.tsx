import { Box, Flex } from "@radix-ui/themes";
import { Avatar, ThemeChanger } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Box>
        <Flex justify="between" align="center" px="4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Quest4Kids"
              width={162}
              height={50}
              priority
            />
          </Link>
          <Flex gap="4" align="center">
            <Avatar />
            <ThemeChanger />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};

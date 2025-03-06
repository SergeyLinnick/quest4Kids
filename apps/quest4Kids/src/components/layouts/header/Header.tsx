import { Box, Button, Flex } from "@radix-ui/themes";
import { Avatar, ThemeChanger } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

import { PAGE_PATH } from "@/consts/pagePath";
import { SignOut } from "../../forms/authentication/signOut";
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
          <Flex justify="between" align="center" width="350px">
            <Link href={PAGE_PATH.DASHBOARD}>
              <Button size="1" color="violet">
                Dashboard
              </Button>
            </Link>
            <Link href={PAGE_PATH.SIGNUP}>
              <Button size="1" color="violet">
                Registration
              </Button>
            </Link>
            <Link href={PAGE_PATH.SIGNIN}>
              <Button size="1" color="violet">
                Sign In
              </Button>
            </Link>
            <SignOut />
          </Flex>

          <Flex gap="4" align="center">
            <Avatar />
            <ThemeChanger />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};

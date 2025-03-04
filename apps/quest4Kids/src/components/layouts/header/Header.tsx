import { Box, Button, Flex } from "@radix-ui/themes";
import { Avatar, ThemeChanger } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

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
          <Link href="/signin">
            <Button size="1" color="violet">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button size="1" color="violet">
              Log In
            </Button>
          </Link>
          <div>
            {/* server sign out */}
            <SignOut />
          </div>
          <Flex gap="4" align="center">
            <Avatar />
            <ThemeChanger />
          </Flex>
        </Flex>
      </Box>
    </header>
  );
};

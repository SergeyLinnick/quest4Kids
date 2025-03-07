import { Box, Flex } from "@radix-ui/themes";
import { Avatar, ButtonLink, ThemeChanger } from "@repo/ui";
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
          <Flex justify="between" align="center" width="450px">
            <ButtonLink href={PAGE_PATH.ABOUT} size="1" color="violet">
              About Us
            </ButtonLink>

            <ButtonLink href={PAGE_PATH.DASHBOARD} size="1" color="violet">
              Dashboard
            </ButtonLink>

            <ButtonLink href={PAGE_PATH.SIGNUP} size="1" color="violet">
              Registration
            </ButtonLink>

            <ButtonLink href={PAGE_PATH.SIGNIN} size="1" color="violet">
              Sign In
            </ButtonLink>

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

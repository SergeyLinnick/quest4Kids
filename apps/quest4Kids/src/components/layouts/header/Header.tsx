import { Flex } from "@radix-ui/themes";
import { ThemeChanger } from "@repo/ui";
import Image from "next/image";
import Link from "next/link";

import { PAGE_PATH } from "@/consts";
import styles from "./header.module.css";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <header className={styles.header}>
      <Flex justify="between" align="center" height="100%" px="4">
        <Link href={PAGE_PATH.HOME} className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Quest4Kids"
            width={162}
            height={50}
            priority
          />
        </Link>
        <Flex gap="4" align="center">
          {children}
          <ThemeChanger />
        </Flex>
      </Flex>
    </header>
  );
};

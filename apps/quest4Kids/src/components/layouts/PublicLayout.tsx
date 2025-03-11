import { PAGE_PATH } from "@/consts/pagePath";
import { ButtonLink } from "@repo/ui";
import { Header } from "./header";

import styles from "./layout.module.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <ButtonLink
          href={PAGE_PATH.ABOUT}
          size="2"
          variant="outline"
          className={styles.headerButton}
        >
          About Us
        </ButtonLink>
        <ButtonLink
          href={PAGE_PATH.SIGNUP}
          size="2"
          variant="outline"
          className={styles.headerButton}
        >
          Sign Up
        </ButtonLink>
        <ButtonLink href={PAGE_PATH.SIGNIN} size="2" color="violet">
          Sign In
        </ButtonLink>
      </Header>
      {children}
    </>
  );
}

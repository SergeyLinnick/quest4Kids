import { Header } from "@/components";
import { PAGE_PATH } from "@/consts";
import { ButtonLink } from "@repo/ui";
import styles from "./../page.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header>
        <a href="/marketing">Marketing</a>
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

import { Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./notFound.module.css";

export default function NotFound() {
  return (
    <Flex height="100vh" justify="center" align="center">
      <Flex
        direction="column"
        gap="6"
        align="center"
        className={styles.container}
      >
        <Heading as="h1" size="8" weight="bold">
          Nothing to see here
        </Heading>
        <Text size="4" color="gray" align="center">
          The page you are trying to open does not exist. You may have mistyped
          the address, or the page has been moved to another URL. If you think
          this is an error, please contact support.
        </Text>
        <Link href="/">Go back home</Link>
        <Text trim="both" className={styles.number}>
          404
        </Text>
      </Flex>
    </Flex>
  );
}

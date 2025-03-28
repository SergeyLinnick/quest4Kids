import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@repo/clerk";
import styles from "../../../page.module.css";

export default function ClerkAuthPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box width="450px" pb="9">
          <Card variant="classic" size="5" mb="9">
            <Heading size="6" align="center" mb="4" color="violet">
              Clerk Auth
            </Heading>
            <Flex justify="between">
              <SignedOut>
                <SignInButton />

                <SignUpButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Flex>
          </Card>
        </Box>
      </div>
    </div>
  );
}

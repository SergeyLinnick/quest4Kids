import { LoginForm } from "@repo/auth";

import { Box, Card, Heading } from "@radix-ui/themes";
import styles from "../../page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <Heading size="8">Login</Heading>

      <Box width="300px">
        <Card>
          <LoginForm />
        </Card>
      </Box>
    </div>
  );
}

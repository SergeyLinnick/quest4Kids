import { LoginForm } from "@repo/auth";

import { Box, Card, Heading } from "@radix-ui/themes";
import styles from "../page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="500px">
          <Card className={styles.card}>
            <Heading size="6" align="center" mb="4" color="violet">
              Login
            </Heading>
            <LoginForm />
          </Card>
        </Box>
      </div>
    </div>
  );
}

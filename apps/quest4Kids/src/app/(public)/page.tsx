import { SignIn } from "@/components/forms";
import { Box, Card, Heading } from "@radix-ui/themes";
import styles from "./page.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="500px">
          <Card className={styles.card}>
            <Heading size="6" align="center" mb="4" color="violet">
              Sign In
            </Heading>
            <SignIn />
          </Card>
        </Box>
      </div>
    </div>
  );
}

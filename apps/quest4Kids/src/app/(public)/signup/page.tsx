import { SignUp } from "@/components";
import { Box, Card, Heading } from "@radix-ui/themes";
import styles from "../page.module.css";

export default function SignUpPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box width="450px" pb="9">
          <Card variant="classic" size="5" mb="9">
            <Heading size="6" align="center" mb="4" color="violet">
              Sign Up
            </Heading>
            <SignUp />
          </Card>
        </Box>
      </div>
    </div>
  );
}

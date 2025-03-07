import { SignOut } from "@/components/forms";
import { Box, Card } from "@radix-ui/themes";
import styles from "../page.module.css";

export default function SignOutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}>
        <Box maxWidth="500px">
          <Card className={styles.card}>
            <SignOut />
          </Card>
        </Box>
      </div>
    </div>
  );
}

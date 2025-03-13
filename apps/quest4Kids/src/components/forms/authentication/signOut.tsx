import { Button } from "@radix-ui/themes";
import { signOut } from "@repo/auth";
import styles from "./signOut.module.css";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <Button
        type="submit"
        className={styles.headerButton}
        size="2"
        variant="outline"
        color="violet"
      >
        Sign Out
      </Button>
    </form>
  );
}

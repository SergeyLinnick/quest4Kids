import { Button } from "@radix-ui/themes";
import { signOut } from "@repo/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" size="2" color="violet">
        Sign Out
      </Button>
    </form>
  );
}

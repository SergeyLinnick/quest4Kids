import { Button } from "@radix-ui/themes";
import { signOut } from "@repo/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/", redirect: true });
      }}
    >
      <Button type="submit" size="2" color="violet">
        Sign Out
      </Button>
    </form>
  );
}

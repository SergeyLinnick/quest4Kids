import { PAGE_PATH } from "@/consts/pagePath";
import { Button } from "@radix-ui/themes";
import { signOut } from "@repo/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: PAGE_PATH.HOME });
      }}
    >
      <Button type="submit" size="1" color="crimson">
        Sign Out
      </Button>
    </form>
  );
}

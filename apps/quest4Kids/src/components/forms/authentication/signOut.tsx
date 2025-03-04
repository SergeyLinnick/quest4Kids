import { signOut } from "@/auth";
import { Button } from "@radix-ui/themes";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/signin" });
      }}
    >
      <Button type="submit" size="1" color="violet">
        Sign Out
      </Button>
    </form>
  );
}

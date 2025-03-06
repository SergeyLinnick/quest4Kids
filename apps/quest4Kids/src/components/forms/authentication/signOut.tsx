import { signOut } from "@/auth";
import { Button } from "@radix-ui/themes";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        // redirect("/home");
      }}
    >
      <Button type="submit" size="1" color="crimson">
        Sign Out
      </Button>
    </form>
  );
}

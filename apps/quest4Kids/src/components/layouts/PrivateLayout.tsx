import { auth } from "@repo/auth";
import { Avatar } from "@repo/ui";
import { getUserInitials } from "@repo/utils";
import { SignOut } from "../forms";
import { Header } from "./header";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const name = session?.user?.name;

  const initials = getUserInitials(name);

  return (
    <>
      <Header>
        <SignOut />
        <Avatar fallback={initials} />
      </Header>
      {children}
    </>
  );
}

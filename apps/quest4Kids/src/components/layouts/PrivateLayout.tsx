import { Avatar } from "@repo/ui";
import { SignOut } from "../forms";
import { Header } from "./header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header>
        <SignOut />
        <Avatar />
      </Header>
      {children}
    </>
  );
}

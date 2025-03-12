import { ROLE } from "@/consts";
import { RoleType } from "@/types";
import { auth } from "@repo/auth";

type ProfileLayoutProps = {
  parent: React.ReactNode;
  child: React.ReactNode;
};

export default async function ProfileLayout({
  parent,
  child,
}: ProfileLayoutProps) {
  const session = await auth();
  const role: RoleType = session?.user?.role;

  return role === ROLE.PARENT ? parent : child;
}

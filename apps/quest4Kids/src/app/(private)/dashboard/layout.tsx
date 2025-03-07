import { ROLE, RoleType } from "@/consts/roles";
import { auth } from "@repo/auth";

type DashboardLayoutProps = {
  parent: React.ReactNode;
  child: React.ReactNode;
};

export default async function DashboardLayout({
  parent,
  child,
}: DashboardLayoutProps) {
  const session = await auth();
  const role: RoleType = session?.user?.role;

  return role === ROLE.PARENT ? parent : child;
}

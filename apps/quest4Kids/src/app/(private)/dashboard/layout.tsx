import { ROLE } from "@/consts";
import { RoleType } from "@/types";
import { authOptions } from "@repo/auth";
import { getServerSession } from "next-auth";

type DashboardLayoutProps = {
  parent: React.ReactNode;
  child: React.ReactNode;
};

export default async function DashboardLayout({
  parent,
  child,
}: DashboardLayoutProps) {
  const session = await getServerSession(authOptions);
  const role: RoleType = session?.user?.role;

  return role === ROLE.PARENT ? parent : child;
}

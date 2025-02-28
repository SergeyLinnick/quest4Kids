import { ROLE, RoleType } from "@/consts/roles";

type DashboardLayoutProps = {
  parent: React.ReactNode;
  child: React.ReactNode;
};

export default function DashboardLayout({
  parent,
  child,
}: DashboardLayoutProps) {
  const role: RoleType = "parent";

  return role === ROLE.PARENT ? parent : child;
}

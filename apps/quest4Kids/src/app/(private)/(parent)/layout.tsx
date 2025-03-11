import { PAGE_PATH } from "@/consts/pagePath";
import { ROLE, RoleType } from "@/consts/roles";
import { auth } from "@repo/auth";
import { NotFound } from "@repo/ui";

export default async function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role: RoleType = session?.user?.role;

  if (role !== ROLE.PARENT) return <NotFound url={PAGE_PATH.DASHBOARD} />;

  return <>{children}</>;
}

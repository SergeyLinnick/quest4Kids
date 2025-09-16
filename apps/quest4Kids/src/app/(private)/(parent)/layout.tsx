import { PAGE_PATH, ROLE } from "@/consts";
import { RoleType } from "@/types";
import { auth } from '@repo/auth/server';
import { NotFound } from "@repo/ui";

export default async function ParentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role: RoleType = (session?.user as any)?.role;

  if (role !== ROLE.PARENT) return <NotFound url={PAGE_PATH.DASHBOARD} />;

  return children;
}

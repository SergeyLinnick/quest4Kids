import { PAGE_PATH, ROLE } from "@/consts";
import { RoleType } from "@/types";
import { authOptions } from "@repo/auth";
import { NotFound } from "@repo/ui";
import { getServerSession } from "next-auth";

export default async function ChildLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const role: RoleType = session?.user?.role;

  if (role !== ROLE.CHILD) return <NotFound url={PAGE_PATH.DASHBOARD} />;

  return children;
}

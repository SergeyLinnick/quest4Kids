import { Header, SignOut } from "@/components";
import { getMenuItems, PAGE_PATH } from "@/consts";
import { RoleType } from "@/types";
import { auth } from "@repo/auth";
import { Avatar, SideBar } from "@repo/ui";
import { getUserInitials } from "@repo/utils";
import Link from "next/link";
import styles from "./layout.module.css";
import NotAuthenticated from "./notAuthenticated";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role: RoleType = session?.user?.role;
  const name = session?.user?.name;

  const initials = getUserInitials(name);

  if (!session) return <NotAuthenticated />;

  return (
    <>
      <Header>
        <SignOut />
        <Link href={PAGE_PATH.PROFILE}>
          <Avatar fallback={initials} />
        </Link>
      </Header>
      <div className={styles.mainLayout}>
        <SideBar menuItems={getMenuItems(role) || []} />
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}

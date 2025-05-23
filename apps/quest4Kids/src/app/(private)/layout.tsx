import { SignOut } from "@/components";
import { NotificationsClient } from "@/components/notifications/NotificationsClient";
import { getMenuItems, PAGE_PATH } from "@/consts";
import { auth, SessionProvider } from "@repo/auth";
import { Avatar, SideBar } from "@repo/ui";
import { Header } from "@repo/ui-tw";
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

  if (!session) return <NotAuthenticated />;

  const { user } = session;

  const initials = getUserInitials(user.name);

  const isParent = user.role === "parent";

  return (
    <SessionProvider session={session}>
      <Header>
        {isParent && <NotificationsClient />}
        <SignOut />
        <Link href={PAGE_PATH.PROFILE}>
          <Avatar fallback={initials} src={user.image} alt={user.name} />
        </Link>
      </Header>
      <div className={styles.mainLayout}>
        <SideBar menuItems={getMenuItems(user.role) || []} />
        <main className={styles.container}>{children}</main>
      </div>
    </SessionProvider>
  );
}

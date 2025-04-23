import { SignOut } from "@/components";
import { NotificationsClient } from "@/components/notifications/NotificationsClient";
import { getMenuItems, PAGE_PATH } from "@/consts";
import { SocketProvider } from "@/socket-client/SocketProvider";
import { auth, SessionProvider } from "@repo/auth";
import { Avatar, SideBar } from "@repo/ui";
import { Button, Header } from "@repo/ui-tw";
import { getUserInitials } from "@repo/utils";
import Link from "next/link";
import { Suspense } from "react";
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
      <SocketProvider userId={user.id}>
        <Header>
          <Suspense
            fallback={
              <Button
                size="icon"
                className="bg-muted-foreground animate-pulse"
              />
            }
          >
            {isParent && <NotificationsClient />}
          </Suspense>

          <SignOut />
          <Link href={PAGE_PATH.PROFILE}>
            <Avatar fallback={initials} src={user.image} alt={user.name} />
          </Link>
        </Header>
        <div className={styles.mainLayout}>
          <SideBar menuItems={getMenuItems(user.role) || []} />
          <main className={styles.container}>{children}</main>
        </div>
      </SocketProvider>
    </SessionProvider>
  );
}

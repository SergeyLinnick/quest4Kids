import PrivateLayout from "@/components/layouts/PrivateLayout";
import { getMenuItems } from "@/consts/menu";
import { RoleType } from "@/consts/roles";
import { auth } from "@repo/auth";
import { SideBar } from "@repo/ui";
import styles from "./layout.module.css";
import NotAuthenticated from "./notAuthenticated";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const role: RoleType = session?.user?.role;

  if (!session) return <NotAuthenticated />;

  return (
    <PrivateLayout>
      <div className={styles.mainLayout}>
        <SideBar menuItems={getMenuItems(role) || []} />
        <main className={styles.container}>{children}</main>
      </div>
    </PrivateLayout>
  );
}

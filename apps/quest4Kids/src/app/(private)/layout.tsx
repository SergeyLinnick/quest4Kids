import { auth } from "@/auth";
import { Header } from "@/components/layouts";
import { getMenuItems } from "@/consts/menu";
import { RoleType } from "@/consts/roles";
import { SideBar } from "@repo/ui";
import styles from "./layout.module.css";
import NotAuthenticated from "./notAuthenticated";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role: RoleType = "parent";

  const session = await auth();
  if (!session) return <NotAuthenticated />;

  return (
    <>
      <Header />
      <div className={styles.mainLayout}>
        <SideBar menuItems={getMenuItems(role) || []} />
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}

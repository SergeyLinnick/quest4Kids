"use client";

import { Header } from "@/components/layouts";
import { getMenuItems } from "@/consts/menu";
import { RoleType } from "@/consts/roles";
import { SideBar } from "@repo/ui";
import { signOut, useSession } from "next-auth/react";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const role: RoleType = "parent";
  const { data: session } = useSession();

  if (!session) return <p>Loading...</p>;

  return (
    <>
      <Header />
      <h1>Welcome, {session?.user?.name || "Anonymous"} !</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <div className={styles.mainLayout}>
        <SideBar menuItems={getMenuItems(role) || []} />
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}

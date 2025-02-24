import { Header } from "@/components/layouts";
import { SideBar } from "@repo/ui";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className={styles.mainLayout}>
        <SideBar
          menuItems={[
            { label: "Home", href: "/" },
            { label: "Kids", href: "/kids" },
            { label: "Logout", href: "/" },
          ]}
        />
        <main className={styles.container}>{children}</main>
      </div>
    </>
  );
}

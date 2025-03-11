import { PAGE_PATH } from "@/consts/pagePath";
import Link from "next/link";
import styles from "./layout.module.css";

export default async function NotAuthenticated() {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.noAuth}>User Not authenticated!</div>
      <Link href={PAGE_PATH.SIGNIN}>Sign in</Link>
    </div>
  );
}

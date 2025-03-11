import { PAGE_PATH } from "@/consts";
import Link from "next/link";
import styles from "./layout.module.css";

// TODO this page should be removed after auth will be completed and tested on production
export default async function NotAuthenticated() {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.noAuth}>User Not authenticated!</div>
      <Link href={PAGE_PATH.SIGNIN}>Sign in</Link>
    </div>
  );
}

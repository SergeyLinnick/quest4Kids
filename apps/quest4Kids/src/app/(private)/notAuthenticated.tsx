import styles from "./layout.module.css";

export default async function NotAuthenticated() {
  return (
    <div className={styles.mainLayout}>
      <div className={styles.noAuth}>User Not authenticated!</div>
    </div>
  );
}

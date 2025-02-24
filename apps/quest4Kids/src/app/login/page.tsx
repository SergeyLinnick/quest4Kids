import { LoginForm } from "@repo/auth";

import styles from "../page.module.css";

export default function TestForm() {
  return (
    <div className={styles.page}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

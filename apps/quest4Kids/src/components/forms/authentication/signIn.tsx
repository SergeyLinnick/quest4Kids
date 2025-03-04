import { signIn } from "@/auth";
import styles from "./signin.module.css";

export function SignIn() {
  return (
    <form
      action={async (formData) => {
        "use server";
        // await signIn("credentials", formData);
        await signIn("credentials", formData);
      }}
    >
      <label className={styles.label}>Email</label>
      <input name="email" type="email" className={styles.input} />

      <label className={styles.label}>Password</label>
      <input name="password" type="password" className={styles.input} />

      <button type="submit" className={styles.btn}>
        Sign In
      </button>
    </form>
  );
}

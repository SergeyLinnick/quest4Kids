"use client";

import { Heading } from "@radix-ui/themes";
import { useActionState } from "react";
import { loginUser } from "./actions";
import styles from "./signin.module.css";

const initialState = { errors: new Map<string, string>(), values: {} };

export function SignIn() {
  const [, formAction] = useActionState(loginUser, initialState);
  return (
    <form action={formAction}>
      <Heading size="1" color="gray" weight="light" mb="3">
        You are not authenticated, please login to your account
      </Heading>
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

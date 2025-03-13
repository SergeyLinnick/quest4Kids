"use client";

import { Heading } from "@radix-ui/themes";
import { initialState } from "@repo/api";
import { useActionState } from "react";
import { registerUser } from "./actions";
import styles from "./signin.module.css";

export function SignUp() {
  const [, formAction] = useActionState(registerUser, initialState);

  return (
    <form action={formAction}>
      <Heading size="1" color="gray" weight="light" mb="3">
        You are not authenticated, please create account
      </Heading>
      <label className={styles.label}>Email</label>
      <input
        name="email"
        type="email"
        className={styles.input}
        required
        placeholder="Enter your email"
      />

      <label className={styles.label}>Name</label>
      <input
        name="name"
        type="text"
        className={styles.input}
        required
        placeholder="Enter your Name"
      />

      <label className={styles.label}>Password</label>
      <input
        name="password"
        type="password"
        className={styles.input}
        required
        placeholder="Enter your password"
      />

      <button type="submit" className={styles.btn}>
        Sign Up
      </button>
    </form>
  );
}

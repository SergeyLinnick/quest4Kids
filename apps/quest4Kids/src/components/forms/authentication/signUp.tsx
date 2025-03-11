"use client";

import { Heading } from "@radix-ui/themes";
import { useActionState } from "react";
import { registerUser } from "./actions";
import styles from "./signin.module.css";

const initialState = { errors: new Map<string, string>(), values: {} };

export function SignUp() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <form action={formAction}>
      <Heading size="1" color="gray" weight="light" mb="3">
        You are not authenticated, please create account
      </Heading>
      <label className={styles.label}>New Email</label>
      <input
        name="email"
        type="email"
        className={styles.input}
        required
        placeholder="Enter your email"
      />

      <label className={styles.label}>New Name</label>
      <input
        name="name"
        type="text"
        className={styles.input}
        required
        placeholder="Enter your Name"
      />

      <label className={styles.label}>New Password</label>
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

"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import { useActionState } from "react";
import { loginUser } from "./actions";
import styles from "./signin.module.css";

const initialState = { errors: new Map<string, string>(), values: {} };

export function SignIn() {
  const [state, formAction] = useActionState(loginUser, initialState);

  console.log("state state state", state);

  return (
    <form action={formAction}>
      <Heading size="1" color="gray" weight="light" mb="3">
        You are not authenticated, please login to your account
      </Heading>

      <label className={styles.label}>Email</label>
      <input
        name="email"
        type="email"
        className={styles.input}
        defaultValue={state?.values?.email || ""}
      />

      <label className={styles.label}>Password</label>
      <input
        name="password"
        type="password"
        className={styles.input}
        defaultValue={state?.values?.password || ""}
      />

      <button type="submit" className={styles.btn}>
        Sign In
      </button>

      {state.errors.size > 0 && (
        <Flex mt="4">
          {Array.from(state.errors.entries()).map(([field, error]) => (
            <Text key={field} color="red" size="1">
              {error}
            </Text>
          ))}
        </Flex>
      )}
    </form>
  );
}

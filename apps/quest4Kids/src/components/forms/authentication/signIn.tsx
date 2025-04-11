"use client";

import { Heading, Text } from "@radix-ui/themes";
import { initialState } from "@repo/api";
import { Button } from "@repo/ui-tw";
import { useActionState } from "react";
import { loginUser } from "./actions";
import styles from "./signin.module.css";

export function SignIn() {
  const [state, formAction] = useActionState(loginUser, initialState);

  return (
    <form action={formAction}>
      <Heading size="1" align="center" color="gray" weight="light" mb="3">
        You are not authenticated, please login to your account
      </Heading>

      <label className={styles.label}>Email</label>
      <input name="email" type="email" className={styles.input} />

      <label className={styles.label}>Password</label>
      <input name="password" type="password" className={styles.input} />

      <div className="text-center">
        <Button type="submit">Sign In</Button>
      </div>

      {state?.errors?.size > 0 && (
        <Text color="red">{state?.errors.get("common")}</Text>
      )}
    </form>
  );
}

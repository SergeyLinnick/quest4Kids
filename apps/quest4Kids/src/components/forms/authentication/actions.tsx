"use server";

import { PAGE_PATH } from "@/consts";
import { signIn } from "@repo/auth";
import { redirect } from "next/navigation";

type Error = Map<string, string>;

type FormState = {
  errors: Error;
  success?: boolean;
  values?: {
    name?: string;
    email?: string;
    password?: number;
  };
};

export async function registerUser(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  try {
    const response = await fetch(
      "https://quest4kids-a7fd24f91954.herokuapp.com/auth/register",
      {
        method: "POST",
        body: JSON.stringify({ email, password, name }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Something went wrong during registration!",
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Something went wrong during registration!";

    throw new Error(errorMessage);
  }

  redirect(PAGE_PATH.SIGNIN);
}

export async function loginUser(
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> {
  return await signIn("credentials", formData);

  // try {
  //   const result: { ok: boolean; error?: string } = await signIn(
  //     "credentials",
  //     formData,
  //   );

  //   console.log("result -----------------------", result);

  //   if (!result?.ok) {
  //     const errorMessage = result?.error || "Invalid credentials!";
  //     console.error("Login error:", errorMessage, { email });
  //     return {
  //       errors: new Map([["form", errorMessage]]),
  //       values: { email },
  //     };
  //   }

  //   return {
  //     errors: new Map(),
  //     success: true,
  //     values: {},
  //   };
  // } catch (error) {
  //   const errorMessage =
  //     error instanceof Error
  //       ? error.message
  //       : "An unknown error occurred during login!";
  //   console.error("Login error:", errorMessage, { email });

  //   return {
  //     errors: new Map([["form", errorMessage]]),
  //     values: { email },
  //   };
  // }
}

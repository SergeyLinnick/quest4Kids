import { z } from "zod";
import type { Error, FormState } from "./types";

export const handleValidationError = (
  error: unknown,
  formData: FormData,
): FormState => {
  const errors: Error = new Map<string, string>();

  if (error instanceof z.ZodError) {
    error.errors.forEach((err) => {
      errors.set(err.path.join(".") || "common", err.message);
    });
    return { errors, values: formData };
  }
  throw error;
};

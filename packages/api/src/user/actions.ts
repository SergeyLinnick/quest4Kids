"use server";

import { redirect } from "next/navigation";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { avatarSchema } from "./resolver";
import { userService } from "./services";

export const addAvatar = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const userId = formData.get("userId");
  const file = formData.get("avatar");

  console.log("userId", userId);
  console.log("file", file);

  try {
    const data = await avatarSchema.parse({
      file,
      userId,
    });
    console.log("data", data);

    await userService.addAvatar(data);
    // revalidatePath(`/profile`);
  } catch (error) {
    return handleValidationError(error, formData);
  }

  redirect(`/profile`);
};

export const fetchAvatar = async (userId: string): Promise<any> => {
  return await userService.getAvatar(userId);
};

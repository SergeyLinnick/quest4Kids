"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { accountSchema, avatarSchema } from "./resolver";
import { userService } from "./services";

export const addAvatar = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const userId = formData.get("userId") as string;
  const file = formData.get("file") as File;

  try {
    const data = await avatarSchema.parse({
      file,
      userId,
    });

    await userService.addAvatar(data);
    revalidatePath(`/kids/${userId}/profile`);

    return {
      success: true,
      values: formData,
      errors: new Map(),
    };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

export const fetchAvatar = async (id: string): Promise<string> => {
  const avatar = await userService.getAvatar(id);
  if (JSON.stringify(avatar) === "{}") return "";
  return avatar;
};

export const editChildAccountById = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const name = formData.get("name")?.toString();
  // const email = formData.get("email")?.toString();
  const id = state?.id;

  try {
    const data = await accountSchema.parseAsync({
      name,
      id,
    });

    await userService.updateChildAccount(data);
    revalidatePath(`/kids/${id}/profile`);
    revalidatePath(`/kids`);
    revalidateTag("children-list");

    return {
      errors: new Map(),
      success: true,
      values: formData,
      id,
    };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

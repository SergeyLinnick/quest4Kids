"use server";

import { revalidatePath } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { accountSchema, accountSchema2, avatarSchema } from "./resolver";
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

export const editChildAccount = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const name = formData.get("name")?.toString();
  const childId = formData.get("id")?.toString();

  try {
    const data = await accountSchema.parseAsync({
      name,
      childId,
    });

    await userService.updateChildAccount(data.childId, data);
    revalidatePath(`/kids/${childId}/profile`);

    return {
      errors: new Map(),
      success: true,
      values: formData,
    };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

export const editChildAccountById = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const name = formData.get("name")?.toString();
  const id = state?.id;

  try {
    const data = await accountSchema2.parseAsync({
      name,
      id,
    });

    await userService.updateChildAccount(data.id, data);
    revalidatePath(`/kids/${id}/profile`);

    return {
      errors: new Map(),
      success: true,
      values: formData,
    };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

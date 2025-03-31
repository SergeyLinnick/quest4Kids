"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
import { profileService } from "../profile";
import {
  accountSchemaEmail,
  accountSchemaName,
  accountSchemaPasswords,
  avatarSchema,
} from "./resolver";
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

export const updateProfile = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const id = state?.id;
  const isParentProfile = state?.isParentProfile;

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const oldPassword = formData.get("oldPassword")?.toString();
  const password = formData.get("password")?.toString();

  const validate = async () => {
    switch (true) {
      // Inline form for name
      case Boolean(name): {
        return await accountSchemaName.parseAsync({ name });
      }
      // Inline form for email
      case Boolean(email): {
        return await accountSchemaEmail.parseAsync({ email });
      }
      // Change password form
      case oldPassword !== undefined || password !== undefined: {
        return await accountSchemaPasswords.parseAsync({
          password,
          oldPassword,
        });
      }
      default: {
        throw new Error("No valid input provided for validation");
      }
    }
  };

  try {
    const data = await validate();

    if (isParentProfile) {
      await profileService.updateParentAccount(data);
    } else {
      await userService.updateChildAccount({ id, ...data });
    }
    revalidatePath(`/kids/${id}/profile`);
    revalidatePath(`/kids`);
    revalidatePath(`/profile`);
    revalidateTag("children-list");

    return {
      errors: new Map(),
      success: true,
      values: formData,
      id,
    };
  } catch (error) {
    return handleValidationError(error, formData, id);
  }
};

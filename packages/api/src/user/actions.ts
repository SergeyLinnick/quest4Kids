"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import type { FormState } from "../_common/types";
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

export const editChildAccountById = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  const id = state?.id;

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const oldPassword = formData.get("oldPassword")?.toString();
  const password = formData.get("password")?.toString();

  const validate = async () => {
    if (name) {
      return await accountSchemaName.parseAsync({
        name,
      });
    }
    if (email) {
      return await accountSchemaEmail.parseAsync({
        email,
      });
    }
    if (oldPassword || password) {
      console.log("IF OLD PASSWORD OR NEW PASSWORD", oldPassword);

      return await accountSchemaPasswords.parseAsync({
        password,
        oldPassword,
      });
    }
  };

  try {
    const data = await validate();

    await userService.updateChildAccount({ id, ...data });

    revalidatePath(`/kids/${id}/profile`);
    revalidatePath(`/kids`);
    revalidateTag("children-list");

    // TODO: refactor
    if (oldPassword === "" || password === "") {
      const errors = new Map<string, string>();
      errors.set("common", "New Password or Current Password is empty strings");
      return {
        errors,
        values: formData,
        id,
        success: false,
      };
    }

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

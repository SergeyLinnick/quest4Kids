"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { handleValidationError } from "../_common/formUtils";
import { FormState } from "../_common/types";
import { childSchema } from "./resolver";
import { userService } from "./services";
import { IChildByIdResponse, IChildResponse } from "./types";

export const addChild = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  try {
    const child = await childSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });
    await userService.addChild(child);
    revalidatePath("/kids");
  } catch (error) {
    return handleValidationError(error, formData);
  }

  redirect("/kids");
};

export const fetchChildren = async (): Promise<IChildResponse> => {
  return await userService.getChildren({
    cache: "force-cache",
    next: {
      tags: ["children-list"],
      revalidate: 60,
    },
  });
};

export const fetchChildById = async (
  id: string,
): Promise<IChildByIdResponse> => {
  return await userService.getChildById({
    id,
    preference: {
      cache: "force-cache",
      next: {
        tags: ["children-list"],
        revalidate: 60 * 60 * 24, // 24 hours
      },
    },
  });
};

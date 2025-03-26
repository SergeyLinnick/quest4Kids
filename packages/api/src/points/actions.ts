"use server";
import { revalidateTag } from "next/cache";
import { handleValidationError } from "../_common/formUtils";
import { FormState } from "../_common/types";
import { pointsService } from "./services";

export const swapPoints = async (
  state: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  try {
    const childId = formData.get("childId") as string;
    const points = Number(formData.get("points"));

    await pointsService.swapPoints(childId, points);
    revalidateTag("children-list");

    return {
      success: true,
      errors: new Map(),
      message: "Points swapped successfully",
    };
  } catch (error) {
    return handleValidationError(error, formData);
  }
};

"use server";

import { revalidatePath } from "next/cache";

export async function customRevalidatePath(url: string) {
  revalidatePath(url);
}

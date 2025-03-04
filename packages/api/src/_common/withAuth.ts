"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiError } from "./errors";

export async function withAuth<T>(
  callback: (token: string) => Promise<T>,
): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    return await callback(token);
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 401) {
        redirect("/login");
      }
      throw error;
    }
    throw new ApiError(500, "Internal Server Error");
  }
}

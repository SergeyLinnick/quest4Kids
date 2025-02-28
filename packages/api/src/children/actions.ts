"use server";

import { userService } from "./services";

export async function getChildrenList() {
  const children = await userService.getChildren();

  return children;
}

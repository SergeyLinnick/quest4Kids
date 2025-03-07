import { PAGE_PATH, PAGE_PATH_CHILD, PAGE_PATH_PARENT } from "./pagePath";
import { ROLE, RoleType } from "./roles";

export const parentMenu = [
  { label: "Dashboard", href: PAGE_PATH.DASHBOARD },
  { label: "Kids", href: PAGE_PATH_PARENT.CHILDREN },
  { label: "Logout", href: PAGE_PATH.SIGNOUT },
];

export const childMenu = [
  { label: "Dashboard", href: PAGE_PATH.DASHBOARD },
  { label: "Tasks", href: PAGE_PATH_CHILD.TASKS },
  { label: "Logout", href: PAGE_PATH.SIGNOUT },
];

export const menuItems = new Map([
  [ROLE.PARENT, parentMenu],
  [ROLE.CHILD, childMenu],
]);

export const getMenuItems = (role: RoleType) => menuItems.get(role);

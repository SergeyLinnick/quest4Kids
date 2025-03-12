export const ROLE = {
  PARENT: "parent",
  CHILD: "child",
} as const;

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

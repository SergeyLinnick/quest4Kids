export const ROLE = {
  PARENT: "parent",
  CHILD: "child",
};

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

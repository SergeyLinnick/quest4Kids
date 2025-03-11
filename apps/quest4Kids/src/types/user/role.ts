import { ROLE } from "@/consts";

export type RoleType = (typeof ROLE)[keyof typeof ROLE];

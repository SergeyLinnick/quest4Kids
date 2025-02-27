export const PAGE_PATH = {
  HOME: "/",
  AUTH: "/auth",
  SIGNUP: "/signup",
  LOGOUT: "/logout",

  DASHBOARD: "/dashboard",
};

export const PAGE_PATH_PARENT = {
  CHILDREN: "/kids",
  CHILD_NEW: "/kids/new",
  CHILD: (childId: string) => `/kids/${childId}`,
  CHILD_EDIT: (childId: string) => `/kids/${childId}/edit`,
};

export const PAGE_PATH_CHILD = {
  TASKS: "/tasks",
};

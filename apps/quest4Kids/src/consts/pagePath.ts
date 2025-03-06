export const PAGE_PATH = {
  HOME: "/",
  SIGNIN: "/signin",
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

export const PUBLIC_ROUTES = [PAGE_PATH.SIGNIN, PAGE_PATH.SIGNUP];

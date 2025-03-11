export const PAGE_PATH = {
  HOME: "/",
  SIGNIN: "/",
  SIGNUP: "/signup",
  SIGNOUT: "/signout",

  DASHBOARD: "/dashboard",
  ABOUT: "/about",
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

export const PUBLIC_ROUTES = [
  PAGE_PATH.HOME,
  PAGE_PATH.SIGNIN,
  PAGE_PATH.SIGNUP,
  PAGE_PATH.ABOUT,
];

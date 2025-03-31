export const PAGE_PATH = {
  HOME: "/",

  AUTH: "/auth",
  CLERK_SIGNIN: "/sign-in",

  SIGNIN: "/signin",
  SIGNUP: "/signup",
  SIGNOUT: "/signout",

  DASHBOARD: "/dashboard",
  ABOUT: "/about",
  PROFILE: "/profile",

  MARKETING: "/marketing",
};

export const PAGE_PATH_PARENT = {
  CHILDREN: "/kids",
  CHILD_NEW: "/kids/new",
  CHILD: (childId: string) => `/kids/${childId}`,
  CHILD_EDIT: (childId: string) => `/kids/${childId}/edit`,
  PROFILE: PAGE_PATH.PROFILE,
};

export const PAGE_PATH_CHILD = {
  TASKS: "/tasks",
  PROFILE: PAGE_PATH.PROFILE,
};

export const PUBLIC_ROUTES = [
  PAGE_PATH.HOME,
  PAGE_PATH.SIGNIN,
  PAGE_PATH.SIGNUP,
  PAGE_PATH.ABOUT,
  PAGE_PATH.MARKETING,

  PAGE_PATH.AUTH + PAGE_PATH.CLERK_SIGNIN,
];

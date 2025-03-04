export const API_PATH = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },
  USER: {
    ADD_CHILD: "/user/create-child-account",
    GET_CHILDREN: "/user/get-children-list",
  },
  TASK: {
    ADD_TASK: (id: string) => `/kids/${id}/task`,
    // GET_TASKS: (id: string) => `/kids/${id}/task`,
  },
};

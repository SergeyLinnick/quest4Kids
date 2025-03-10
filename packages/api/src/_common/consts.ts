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
    ADD_TASK: (childId: string) => `/kids/${childId}/task`,
    GET_TASKS: "/tasks",
    DELETE_TASK: (taskId: string) => `/tasks/${taskId}`,
  },
};

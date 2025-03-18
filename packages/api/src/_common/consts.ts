export const API_PATH = {
  AUTH: {
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
  },
  USER: {
    ADD_CHILD: "/user/create-child-account",
    GET_CHILDREN: "/user/get-children-list",
    GET_CHILD_BY_ID: (childId: string) => `/user/get-child-account/${childId}`,
    UPDATE_CHILD: (childId: string) => `/user/update-child-account/${childId}`,
    GET_AVATAR: (userId: string) => `/user/${userId}/avatar`,
    ADD_AVATAR: (userId: string) => `/user/${userId}/avatar`,
  },
  TASK: {
    ADD_TASK: (childId: string) => `/kids/${childId}/task`,
    GET_TASKS: "/tasks",
    DELETE_TASK: (taskId: string) => `/tasks/${taskId}`,
    UPDATE_TASK: (taskId: string) => `/tasks/${taskId}`,
  },
};

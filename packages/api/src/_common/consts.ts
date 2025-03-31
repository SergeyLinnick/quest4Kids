export const API_PATH = {
  AUTH: {
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
    UPDATE_PROFILE: "/auth/profile",
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
    GET_TASKS: "/tasks",
    GET_TASK_STATISTICS: "/tasks/statistics",
    ADD_TASK: (childId: string) => `/kids/${childId}/task`,
    DELETE_TASK: (taskId: string) => `/tasks/${taskId}`,
    UPDATE_TASK: (taskId: string) => `/tasks/${taskId}`,
  },
  POINTS: {
    SWAP_POINTS: (childId: string) => `/user/${childId}/claim-points`,
  },
};

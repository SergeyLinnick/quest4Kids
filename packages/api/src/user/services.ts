import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";

const api = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  addAvatar: ({ file, userId }: any): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    const options = {
      method: "POST",
      url: `${api}${API_PATH.USER.ADD_AVATAR(userId)}`,
      body: formData,
      headers: {},
    };

    return authHttpClient.fetch(options);
  },

  getAvatar: (userId: string): Promise<string> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_AVATAR(userId)}`,
    };
    return authHttpClient.fetch(options);
  },

  updateChildAccount: (childId: string, values: any): Promise<any> => {
    const { email, name, password } = values;

    const options = {
      method: "PATCH",
      url: `${api}${API_PATH.USER.UPDATE_CHILD(childId)}`,
      body: JSON.stringify({ email, name, password }),
    };

    return authHttpClient.fetch(options);
  },
};

import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";

const api = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  addAvatar: ({ file, userId }: any): Promise<any> => {
    console.log("file----", file);
    console.log("userId----", userId);

    const options = {
      method: "POST",
      url: `${api}${API_PATH.USER.ADD_AVATAR(userId)}`,
      body: JSON.stringify({ file }),
    };

    return authHttpClient.fetch(options);
  },

  getAvatar: (userId: string): Promise<any> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_AVATAR(userId)}`,
    };

    return authHttpClient.fetch(options);
  },
};

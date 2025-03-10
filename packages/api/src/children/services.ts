import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { FetchConfig } from "../_common/types";
import { IChild, IChildResponse, ICreateChild } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const userService = {
  addChild: ({ email, password, name }: ICreateChild): Promise<IChild> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.USER.ADD_CHILD}`,
      body: JSON.stringify({ email, password, name }),
    };

    return authHttpClient.fetch(options);
  },

  getChildren: (preference?: FetchConfig): Promise<IChildResponse> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_CHILDREN}?limit=20`,
      ...preference,
    };

    return authHttpClient.fetch(options);
  },
};

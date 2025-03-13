import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { FetchConfig } from "../_common/types";
import {
  IChild,
  IChildByIdResponse,
  IChildResponse,
  ICreateChild,
} from "./types";

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
    const searchParams = new URLSearchParams({
      limit: "20",
    });

    const params = searchParams.toString();

    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_CHILDREN}?${params}`,
      ...preference,
    };

    return authHttpClient.fetch(options);
  },

  getChildById: ({
    id,
    preference,
  }: {
    id: string;
    preference?: FetchConfig;
  }): Promise<IChildByIdResponse> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_CHILD_BY_ID(id)}`,
      ...preference,
    };

    return authHttpClient.fetch(options);
  },
};

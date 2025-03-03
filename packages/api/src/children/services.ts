import { AxiosResponse } from "axios";
import { API_PATH } from "../_common/consts";
import {
  clientRequestWithAuth,
  serverRequestWithAuth,
} from "../_common/request";
import { IChild, ICreateChild } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;
export const getChildrenURL = `${api}${API_PATH.USER.GET_CHILDREN}`;

export const userService = {
  addChild: ({ email, password, name }: ICreateChild): Promise<IChild> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.USER.ADD_CHILD}`,
      data: JSON.stringify({ email, password, name }),
    };

    return clientRequestWithAuth(options);
  },

  getChildren: (): Promise<AxiosResponse<IChild[]>> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.USER.GET_CHILDREN}`,
    };

    return serverRequestWithAuth(options);
  },
};

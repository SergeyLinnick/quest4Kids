import { AxiosRequestConfig } from "axios";
import { API_PATH } from "../_common/consts";
import { setCookie } from "../_common/cookies";
import { request } from "../_common/request";

const api = process.env.NEXT_PUBLIC_API_URL;
const loginPath = API_PATH.AUTH.LOGIN;

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `${api}${loginPath}`,
      data: { email, password },
    };

    const response: { accessToken: string } = await request(options);

    if (response?.accessToken) {
      setCookie("token", response.accessToken);
    }
    return response;
  },
};

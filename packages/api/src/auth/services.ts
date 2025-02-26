import { API_PATH } from "../_common/consts";
import { request } from "../_common/request";

const api = process.env.NEXT_PUBLIC_API_URL;
const loginPath = API_PATH.AUTH.LOGIN;

export const authService = {
  login: ({ email, password }: { email: string; password: string }) => {
    const options = {
      method: "POST",
      url: `${api}${loginPath}`,
      data: JSON.stringify({ email, password }),
    };

    return request(options);
  },
};

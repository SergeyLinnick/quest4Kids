import { API_PATH } from "../_common/consts";
import { request } from "../_common/request";

export const authService = {
  login: ({ email, password }: { email: string; password: string }) => {
    const options = {
      method: "POST",
      url: API_PATH.AUTH.LOGIN,
      body: JSON.stringify({ email, password }),
    };

    return request(options);
  },
};

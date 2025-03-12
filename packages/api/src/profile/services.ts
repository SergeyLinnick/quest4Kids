import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { FetchConfig } from "../_common/types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const profileService = {
  getProfile: (preference?: FetchConfig): Promise<any> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.AUTH.PROFILE}`,
      ...preference,
    };

    return authHttpClient.fetch(options);
  },
};

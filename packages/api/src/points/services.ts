import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";

const api = process.env.NEXT_PUBLIC_API_URL;

export const pointsService = {
  swapPoints: (childId: string, points: number): Promise<boolean> => {
    const options = {
      method: "POST",
      url: `${api}${API_PATH.POINTS.SWAP_POINTS(childId)}`,
      body: JSON.stringify({ exchangePoints: points }),
    };

    return authHttpClient.fetch(options);
  },
};

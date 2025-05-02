import { Session } from "@repo/auth";
import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { IChatMessageResponse, IChatUserResponse } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const chatService = {
  /**
   * Get the chat users
   * @returns The users
   */
  getChatUsers: ({
    session,
  }: {
    session?: Session;
  } = {}): Promise<IChatUserResponse[]> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.CHAT.GET_CHAT_USERS}`,
      sessionClient: session || null,
    };
    return authHttpClient.fetch(options);
  },

  /**
   * Get the chat messages
   * @returns The messages
   */
  getChatMessages: ({
    session,
    withUserId,
  }: {
    session?: Session;
    withUserId: string;
  }): Promise<IChatMessageResponse[]> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.CHAT.GET_CHAT_MESSAGES}?withUserId=${withUserId}`,
      sessionClient: session || null,
    };
    return authHttpClient.fetch(options);
  },
};

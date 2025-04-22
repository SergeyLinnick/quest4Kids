import { API_PATH } from "../_common/consts";
import { authHttpClient } from "../_common/fetchInstance";
import { INotificationResponse } from "./types";

const api = process.env.NEXT_PUBLIC_API_URL;

export const notificationsService = {
  /**
   * Get the notifications
   * @returns The notifications
   */
  getNotifications: (): Promise<INotificationResponse[]> => {
    const options = {
      method: "GET",
      url: `${api}${API_PATH.NOTIFICATIONS.GET_NOTIFICATIONS}`,
    };
    return authHttpClient.fetch(options);
  },
  /**
   * Mark the notification as read
   * @param notificationId - The notification id
   * @returns The notification
   */
  markNotificationAsRead: (
    notificationId: string,
    session: any,
  ): Promise<INotificationResponse> => {
    const options = {
      method: "PATCH",
      url: `${api}${API_PATH.NOTIFICATIONS.MARK_NOTIFICATION_AS_READ(
        notificationId,
      )}`,
      sessionClient: session,
    };
    return authHttpClient.fetch(options);
  },
};

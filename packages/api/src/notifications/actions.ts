"use server";

import { mapNotifications } from "@repo/utils";
import { notificationsService } from "./services";
import { INotification, INotificationResponse } from "./types";

export const fetchNotifications = async (): Promise<INotification[]> => {
  const notifications: INotificationResponse[] =
    await notificationsService.getNotifications();

  return mapNotifications(notifications);
};

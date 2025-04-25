"use client";

import { useGetNotifications } from "@repo/api";
import { NotificationList } from "@repo/ui-tw";

type NotificationListClientProps = {
  markNotificationAsRead: (notificationId: string) => void;
};

export const NotificationListClient = ({
  markNotificationAsRead,
}: NotificationListClientProps) => {
  const { notifications, isLoading } = useGetNotifications();

  return (
    <NotificationList
      isLoading={isLoading}
      notifications={notifications?.slice(0, 10) || []}
      onNotificationClick={markNotificationAsRead}
    />
  );
};

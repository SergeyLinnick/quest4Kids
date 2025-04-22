"use client";

import { useEffect, useState } from "react";

import { useSocketContext } from "@/socket-client/SocketProvider";
import { useMarkNotificationAsRead } from "@repo/api";
import { NotificationButton, NotificationList, Popover } from "@repo/ui-tw";

export const NotificationsClient = ({
  notifications,
}: {
  notifications: any;
}) => {
  const { messages } = useSocketContext();

  // TODO: Use zustand to store the notifications
  const [allNotifications, setAllNotifications] = useState<any[]>(
    notifications || [],
  );

  useEffect(() => {
    setAllNotifications((prev) => [...messages, ...prev]);
  }, [messages]);

  const markNotificationIsRead = (notificationId: string) => {
    setAllNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true, isNew: false }
          : notification,
      ),
    );
  };

  const { markNotificationAsRead } = useMarkNotificationAsRead(
    markNotificationIsRead,
  );

  const hasUnreadNotifications = allNotifications.some(
    (notification) => !notification.isRead,
  );

  return (
    <Popover
      size="lg"
      content={
        <NotificationList
          notifications={allNotifications.slice(0, 20)}
          onNotificationClick={markNotificationAsRead}
        />
      }
    >
      <NotificationButton hasNewNotifications={hasUnreadNotifications} />
    </Popover>
  );
};

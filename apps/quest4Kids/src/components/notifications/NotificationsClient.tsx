"use client";

import { useEffect, useState } from "react";

import { useSocketContext } from "@/socket-client/SocketProvider";
import {
  INotification,
  useGetNotifications,
  useMarkNotificationAsRead,
} from "@repo/api";
import { NotificationButton, NotificationList, Popover } from "@repo/ui-tw";

export const NotificationsClient = () => {
  const { messages } = useSocketContext();

  // TODO: Use zustand to store the notifications
  const [allNotifications, setAllNotifications] = useState<INotification[]>([]);

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

  const { notifications, isLoading } = useGetNotifications();

  useEffect(() => {
    setAllNotifications(notifications || []);
  }, [notifications]);

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

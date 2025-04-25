"use client";

import { useEffect } from "react";

import { SocketProviderWrapper } from "@/contexts/SocketProviderWrapper";
import { useNotificationStore } from "@/store/notificationStore";
import {
  INotification,
  useGetUnreadNotificationsCount,
  useMarkNotificationAsRead,
} from "@repo/api";
import { NotificationButton, Popover, toast } from "@repo/ui-tw";

import { NotificationListClient } from "./NotificationListClient";

export const NotificationsClient = () => {
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const increment = useNotificationStore.getState().increment;
  const decrement = useNotificationStore.getState().decrement;
  const setCount = useNotificationStore((s) => s.setCount);

  const { unreadNotificationsCount, isSuccess } =
    useGetUnreadNotificationsCount();

  const { markNotificationAsRead } = useMarkNotificationAsRead(decrement);

  useEffect(() => {
    if (isSuccess && unreadNotificationsCount?.unreadCount !== undefined) {
      setCount(unreadNotificationsCount.unreadCount);
    }
  }, [isSuccess, unreadNotificationsCount, setCount]);

  const handleNotification = (notification: INotification) => {
    increment();
    toast(notification.title, {
      description: notification.date,
      action: {
        label: "Read",
        onClick: () => markNotificationAsRead(notification.id),
      },
    });
  };

  return (
    <SocketProviderWrapper onNotification={handleNotification}>
      <Popover
        size="lg"
        content={
          <NotificationListClient
            markNotificationAsRead={markNotificationAsRead}
          />
        }
      >
        <NotificationButton count={unreadCount} />
      </Popover>
    </SocketProviderWrapper>
  );
};

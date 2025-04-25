"use client";

import { LoaderIcon } from "@/components/icons/LoaderIcon";
import { ScrollArea } from "../../ui/scroll-area";
import { NotificationItem } from "./NotificationItem";

type NotificationListProps = {
  notifications: {
    id: string;
    title: string;
    date: string;
    isRead: boolean;
    imageUrl?: string;
    subtitle?: string;
  }[];
  onNotificationClick?: (notificationId: string) => void;
  isLoading?: boolean;
};

export const NotificationList = ({
  notifications,
  onNotificationClick,
  isLoading,
}: NotificationListProps) => {
  return (
    <div className="-m-4 overflow-hidden">
      <div className="border-b px-4 py-3 font-semibold text-lg">
        Notifications
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <LoaderIcon />
        </div>
      ) : notifications.length > 0 ? (
        <ScrollArea type="always" className="h-[80vh]">
          <ul className="divide-y">
            {notifications.map((n) => (
              <NotificationItem
                key={n.id}
                id={n.id}
                title={n.title}
                date={n.date}
                imageUrl={n.imageUrl}
                subtitle={n.subtitle}
                isRead={n.isRead}
                onClick={onNotificationClick}
              />
            ))}
          </ul>
        </ScrollArea>
      ) : (
        <div className="flex items-center justify-center py-6">
          <p className="text-center">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

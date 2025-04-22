"use client";

import { FC } from "react";

import { cn } from "../../../lib/utils";
import { Avatar } from "../../ui/avatar/avatar";

type NotificationItemProps = {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
  onClick?: (id: string) => void;
  isRead?: boolean;
};

export const NotificationItem: FC<NotificationItemProps> = ({
  id,
  title,
  subtitle,
  date,
  imageUrl,
  onClick,
  isRead = true,
}) => {
  const handleClick = () => {
    onClick?.(id);
  };

  const unreadClass =
    !isRead &&
    "bg-orange-100 dark:bg-orange-900 hover:bg-orange-200 dark:hover:bg-orange-800";

  return (
    <li
      className={cn(
        "flex gap-3 p-3 hover:bg-muted cursor-pointer",
        unreadClass,
      )}
      onClick={handleClick}
    >
      {<Avatar src={imageUrl} fallback="MT" />}
      <div className="flex flex-col">
        <span className="text-md font-medium leading-snug">{title}</span>
        {subtitle && <span className="text-sm text-gray-400">{subtitle}</span>}
        {date && <span className="text-sm text-gray-400 mt-1">{date}</span>}
      </div>
    </li>
  );
};

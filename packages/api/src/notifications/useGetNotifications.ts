import { useQuery } from "@tanstack/react-query";

import { mapNotifications } from "@repo/utils";
import { useSession } from "next-auth/react";

import { notificationsService } from "./services";
import { INotification, INotificationResponse } from "./types";

export const useGetNotifications = () => {
  const { data: session } = useSession();

  const {
    data: notifications,
    isFetching: isLoading,
    error,
    refetch: fetchNotifications,
    isSuccess,
  } = useQuery<INotificationResponse[], Error, INotification[]>({
    queryKey: ["notifications"],
    queryFn: () => notificationsService.getNotifications({ session }),
    enabled: Boolean((session as any)?.user?.id),
    retry: 1,
    select: mapNotifications,
  });

  return { notifications, isLoading, error, fetchNotifications, isSuccess };
};

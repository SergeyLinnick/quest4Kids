import { useQuery } from "@tanstack/react-query";

import { useSession } from "@repo/auth";
import { mapNotifications } from "@repo/utils";

import { notificationsService } from "./services";
import { INotification, INotificationResponse } from "./types";

export const useGetNotifications = () => {
  const { session } = useSession();

  const {
    data: notifications,
    isFetching: isLoading,
    error,
    refetch: fetchNotifications,
    isSuccess,
  } = useQuery<INotificationResponse[], Error, INotification[]>({
    queryKey: ["notifications"],
    queryFn: () => notificationsService.getNotifications({ session }),
    enabled: !!session?.user?.id,
    retry: 1,
    select: mapNotifications,
  });

  return { notifications, isLoading, error, fetchNotifications, isSuccess };
};

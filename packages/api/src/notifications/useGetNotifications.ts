import { useSession } from "@repo/auth";
import { useQuery } from "@tanstack/react-query";

import { mapNotifications } from "@repo/utils";
import { notificationsService } from "./services";
import { INotification, INotificationResponse } from "./types";

export const useGetNotifications = () => {
  const { session } = useSession();

  const {
    data: notifications,
    isFetching: isLoading,
    error,
  } = useQuery<INotificationResponse[], Error, INotification[]>({
    queryKey: ["notifications"],
    queryFn: () => {
      return notificationsService.getNotifications({ session });
    },
    enabled: !!session,
    staleTime: 1000 * 60 * 5, // 5 minutes
    // refetchInterval: 1000 * 60 * 5, // 5 minutes
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    select: (data) => {
      return mapNotifications(data);
    },
  });

  return { notifications, isLoading, error };
};

import { useQuery } from "@tanstack/react-query";

import { useSession } from "@repo/auth";

import { notificationsService } from "./services";

export const useGetUnreadNotificationsCount = () => {
  const { session } = useSession();

  const {
    data: unreadNotificationsCount,
    isFetching: isLoading,
    isSuccess,
  } = useQuery<any, Error, { unreadCount: number }>({
    queryKey: ["unreadNotificationsCount"],
    queryFn: () => notificationsService.getUnreadNotificationCount(session),
    enabled: !!session?.user?.id,
    retry: 1,
    select: (data) => {
      return { unreadCount: data?.unreadNotificationCount };
    },
  });

  return {
    unreadNotificationsCount,
    isLoading,
    isSuccess,
  };
};

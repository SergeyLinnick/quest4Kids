import { useSession } from "@repo/auth";
import { useMutation } from "@tanstack/react-query";
import { notificationsService } from "./services";
import { INotificationResponse } from "./types";

export const useMarkNotificationAsRead = (onSuccess?: any) => {
  const { session } = useSession();

  const {
    mutate: markNotificationAsRead,
    isPending: isLoading,
    error,
    isSuccess,
  } = useMutation<INotificationResponse, Error, string>({
    mutationFn: (notificationId: string) => {
      return notificationsService.markNotificationAsRead(
        notificationId,
        session,
      );
    },
    onSuccess: (_, notificationId) => {
      onSuccess?.(notificationId);
    },
    onError: (error) => {
      console.error("Error marking notification as read:", error);
    },
  });

  return { markNotificationAsRead, isLoading, error, isSuccess };
};

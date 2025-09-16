import { useQuery } from "@tanstack/react-query";

import { useSession } from "@repo/auth/client";
import { mapChatMessages } from "@repo/utils";

import { chatService } from "./services";
import { IChatMessage, IChatMessageResponse } from "./types";

export const useGetChatMessages = ({ withUserId }: { withUserId: string }) => {
  const { data: session } = useSession();

  const {
    data: chatMessages,
    isFetching: isLoading,
    error,
    refetch: fetchChatMessages,
    isSuccess,
  } = useQuery<IChatMessageResponse[], Error, IChatMessage[]>({
    queryKey: ["chatMessages", withUserId],
    queryFn: () => chatService.getChatMessages({ session: session!, withUserId }),
    enabled: !!withUserId,
    retry: 1,
    select: (data) => mapChatMessages(data, session?.user?.id || ''),
  });

  return { chatMessages, isLoading, error, fetchChatMessages, isSuccess };
};

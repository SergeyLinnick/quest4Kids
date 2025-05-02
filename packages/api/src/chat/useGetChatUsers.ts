import { useQuery } from "@tanstack/react-query";

import { useSession } from "@repo/auth";
import { mapChatUsers } from "@repo/utils";

import { chatService } from "./services";
import { IChatUser, IChatUserResponse } from "./types";

export const useGetChatUsers = () => {
  const { session } = useSession();

  const {
    data: chatUsers,
    isFetching: isLoading,
    error,
    refetch: fetchChatUsers,
    isSuccess,
  } = useQuery<IChatUserResponse[], Error, IChatUser[]>({
    queryKey: ["chatUsers"],
    queryFn: () => chatService.getChatUsers({ session }),
    enabled: !!session?.user?.id,
    retry: 1,
    select: mapChatUsers,
  });

  return { chatUsers, isLoading, error, fetchChatUsers, isSuccess };
};

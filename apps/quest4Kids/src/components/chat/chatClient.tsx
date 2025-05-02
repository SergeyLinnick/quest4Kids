"use client";

import { useGetChatUsers } from "@repo/api";
import { Chat } from "@repo/chat";

import { SocketProviderWrapper } from "../../contexts/SocketProviderWrapper";

export const ChatClient = () => {
  const { chatUsers, isLoading } = useGetChatUsers();

  if (isLoading) return <div>Loading...</div>;

  if (!chatUsers) return <div>No chat users</div>;

  return (
    <SocketProviderWrapper>
      <Chat users={chatUsers} />
    </SocketProviderWrapper>
  );
};

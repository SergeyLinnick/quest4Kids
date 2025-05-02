"use client";

import { useState } from "react";
import { Button, ChatList, Input, MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

import { IChatUser, useGetChatMessages } from "@repo/api";

import { useSocketContext } from "./SocketProvider";

type ChatProps = {
  users: IChatUser[];
};

export const Chat = ({ users }: ChatProps) => {
  const { socket } = useSocketContext();
  const [selectedUser, setSelectedUser] = useState(users?.[0]);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

  const { chatMessages, isLoading, isSuccess } = useGetChatMessages({
    withUserId: selectedUser?.id || "",
  });

  // useEffect(() => {
  //   if (isSuccess && chatMessages && chatMessages?.length > 0) {
  //     setMessages(chatMessages);
  //   }
  // }, [chatMessages, isSuccess]);

  const handleSend = () => {
    if (!inputValue.trim() || !selectedUser) return;

    // Create new message
    const newMessage: any = {
      id: Date.now().toString(),
      position: "right",
      type: "text",
      title: "Me",
      text: inputValue,
      date: new Date(),
      focus: false,
      titleColor: "black",
      forwarded: false,
      replyButton: false,
      removeButton: false,
      status: "sent",
      notch: true,
      retracted: false,
    };

    // Send through socket
    socket?.emit("send-chat-message", {
      receiverId: selectedUser.id,
      content: inputValue,
    });

    // Update local state
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar with user list */}
      <div className="w-1/4 border-r p-2 overflow-y-auto">
        <ChatList
          id="chat-list"
          className="chat-list"
          lazyLoadingImage=""
          dataSource={users}
          onClick={(item) =>
            setSelectedUser(users.find((user) => user.id === item.id))
          }
        />
      </div>

      {/* Chat window */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div>Loading...</div>
          ) : chatMessages && chatMessages?.length > 0 ? (
            <MessageList
              className="message-list"
              lockable
              toBottomHeight="100%"
              dataSource={messages}
              referance={(ref: any) => {}}
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              <div className="text-gray-500">There are no messages</div>
            </div>
          )}
        </div>
        <div className="mt-2">
          <Input
            placeholder="Type a message..."
            multiline={false}
            value={inputValue}
            maxHeight={100}
            onChange={(e: any) => setInputValue(e.target.value)}
            rightButtons={
              <Button
                text="Send"
                onClick={handleSend}
                title="Send"
                icon={{
                  float: "left",
                  size: 15,
                  // component: <IconExample />,
                }}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

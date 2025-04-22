"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import { INotification } from "@repo/api";
import { mapNotification } from "@repo/utils";
interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  messages: INotification[];
  setMessages: (messages: INotification[]) => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  messages: [],
  setMessages: () => {},
});

interface Props {
  userId: string;
  children: React.ReactNode;
  onNotification?: (data: INotification) => void;
}

export const SocketProvider = ({ userId, children, onNotification }: Props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<INotification[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId) return;

    const socket = io("http://quest4kids-api.us-east-1.elasticbeanstalk.com", {
      query: { userId },
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Socket connected");
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("⚠️ Socket disconnected");
    });

    socket.on("notification", (data) => {
      console.log("🔔 Notification:", data);
      const notification = mapNotification(data);

      setMessages((prev) => [...prev, notification]);
      onNotification?.(notification);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId, onNotification]);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        isConnected,
        messages,
        setMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);

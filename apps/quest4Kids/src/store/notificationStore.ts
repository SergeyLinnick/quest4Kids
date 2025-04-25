import { create } from "zustand";
import { persist } from "zustand/middleware";

export const NOTIFICATION_STORE_NAME = "notification-store";

type NotificationStore = {
  unreadCount: number;
  setCount: (count: number) => void;
  increment: () => void;
  decrement: () => void;
  markAllRead: () => void;
  reset: () => void;
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set) => ({
      unreadCount: 0,
      setCount: (count) => set({ unreadCount: count }),
      increment: () => set((state) => ({ unreadCount: state.unreadCount + 1 })),
      decrement: () =>
        set((state) => {
          if (state.unreadCount > 0) {
            return { unreadCount: state.unreadCount - 1 };
          }
          return state;
        }),
      markAllRead: () => set({ unreadCount: 0 }),
      reset: () => set({ unreadCount: 0 }),
    }),
    {
      name: NOTIFICATION_STORE_NAME,
    },
  ),
);

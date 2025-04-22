export interface INotificationResponse {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  userId: string;
}

export interface INotification {
  id: string;
  isRead: boolean;
  userId: string;
  title: string;
  date: string;
}

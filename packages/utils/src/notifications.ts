import { formatDistanceToNow } from "./date/formatDate";

export const mapNotification = (notification: any) => {
	return {
		id: notification.id,
		title: notification.message || "",
		date: formatDistanceToNow(notification.createdAt),
		isRead: notification.isRead || false,
		userId: notification.userId,
	};
};

export const mapNotifications = (notifications: any) => {
	return notifications.map((notification: any) => mapNotification(notification));
};

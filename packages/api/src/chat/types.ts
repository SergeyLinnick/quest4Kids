export interface IChatUserResponse {
  id: string;
  name: string;
  isOnline: boolean;
  unreadCount: number;
  avatarName?: string;
}

export interface IChatUser {
  avatar: string;
  alt: string;
  title: string;
  subtitle: string;
  date: Date;
  unread: number;
  id: string;
  isOnline?: boolean;
}

export interface IChatMessageResponse {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface IChatMessage {
  id: string;
  position: string;
  type: string;
  title: string;
  text: string | number;
  date: Date;
  focus: boolean;
  titleColor: string;
  forwarded: false;
  replyButton: false;
  removeButton: boolean;
  status: string;
  notch: boolean;
  retracted: boolean;
}

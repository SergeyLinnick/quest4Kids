export const mapChatUser = (user: any): any => {
	return {
		id: user?.id,
		avatar: user?.avatarName
			? `https://my-nest-bucket-test.s3.amazonaws.com/${user?.avatarName}`
			: "https://avatars.githubusercontent.com/u/1",
		isOnline: user?.isOnline,
		alt: user?.name,
		title: user?.name,
		subtitle: "Click to chat",
		date: new Date(),
		unread: user?.unreadCount,
	};
};

export const mapChatUsers = (users: any[]): any[] => {
	return users.map(user => mapChatUser(user));
};

export const mapChatMessage = (message: any, userId: string): any => {
	return {
		id: message?.id,
		position: message?.senderId === userId ? "left" : "right",
		type: "text",
		title: message?.senderId === userId ? message?.senderId : "Me",
		text: message?.content,
		date: new Date(message?.createdAt),
		focus: false,
		titleColor: "black",
		forwarded: false,
		replyButton: false,
		removeButton: false,
		status: "sent",
		notch: true,
		retracted: false,
	};
};

export const mapChatMessages = (messages: any[], userId: string): any[] => {
	return messages.map(message => mapChatMessage(message, userId));
};

import "next-auth";

declare module "next-auth" {
	interface User {
		id: string;
		email: string;
		roles?: string[];
	}

	interface Session {
		user: User;
		accessToken?: string;
		idToken?: string;
		expiresAt?: number;
	}
}
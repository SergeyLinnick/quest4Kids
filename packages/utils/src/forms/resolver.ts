import z from "zod";

export const PasswordResolver = z
	.string()
	.regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
	.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
	.regex(/[a-z]/, "Password must contain at least one lowercase letter")
	.regex(/[0-9]/, "Password must contain at least one number")
	.min(8, "Password must be at least 8 characters long");

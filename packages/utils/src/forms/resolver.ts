import * as yup from "yup";

export const PasswordResolver = yup
	.string()
	.required("Password is required")
	.min(6, "Password must be at least 6 characters")
	.matches(/[A-Z]/, "Password must contain at least one capital letter")
	.matches(/[0-9]/, "Password must contain at least one number")
	.matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

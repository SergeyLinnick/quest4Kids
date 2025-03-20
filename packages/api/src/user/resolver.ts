import z from "zod";

export const avatarSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "File is required",
  }),
  userId: z.string().nonempty("User ID is required"),
});

export const accountSchemaName = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(20, "Name must be more than 20 characters"),
});

export const accountSchemaEmail = z.object({
  email: z.string().email("Invalid email").min(1, "Email is required"),
});

export const accountSchemaPasswords = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "New Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "New Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "New Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "New Password must contain at least one special character",
    )
    .refine((val) => val.trim() !== "", "New Password cannot be empty"),
  oldPassword: z
    .string()
    .min(8, "Current Password must be at least 8 characters long")
    .regex(
      /[A-Z]/,
      "Current Password must contain at least one uppercase letter",
    )
    .regex(
      /[a-z]/,
      "Current Password must contain at least one lowercase letter",
    )
    .regex(/[0-9]/, "Current Password must contain at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Current Password must contain at least one special character",
    )
    .refine((val) => val.trim() !== "", "Current Password cannot be empty"),
});

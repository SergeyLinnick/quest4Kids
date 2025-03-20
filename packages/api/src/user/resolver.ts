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

import z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(20, "Title must be less than 20 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(50, "Description must be less than 50 characters"),
  points: z
    .number()
    .positive("Points must be a positive number")
    .int("Points must be an integer"),
  status: z.enum(["OPEN", "IN_PROGRESS", "DONE"], {
    errorMap: () => ({ message: "Invalid status" }),
  }),
  userId: z.string().readonly(),
});

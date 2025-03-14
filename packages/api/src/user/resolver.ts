import z from "zod";

export const avatarSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size > 0, {
    message: "File is required",
  }),
  userId: z.string().nonempty("User ID is required"),
});

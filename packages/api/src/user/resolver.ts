import z from "zod";

export const avatarSchema = z.object({
  file: z.instanceof(File),
  userId: z.string().readonly(),
});

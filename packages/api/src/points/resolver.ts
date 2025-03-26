import z from "zod";

export const swapPointSchema = (maxPoints: number) =>
  z.object({
    points: z
      .number()
      .min(1, "Points is required")
      .refine((val) => val <= maxPoints, {
        message: `Points must be less than ${maxPoints}`,
      }),
    childId: z.string().min(1, "Child ID is required"),
  });

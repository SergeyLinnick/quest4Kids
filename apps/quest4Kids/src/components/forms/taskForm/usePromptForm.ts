import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const promptSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
});

export type PromptFormValues = z.infer<typeof promptSchema>;

export const usePromptForm = () =>
  useForm<PromptFormValues>({
    resolver: zodResolver(promptSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
    defaultValues: { description: "" },
  });

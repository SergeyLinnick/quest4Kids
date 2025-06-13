import { OpenAI } from "openai";
import { generateTaskDescriptionPrompt } from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export async function generateTaskDescription(
  prompt: string,
  type: "polite" | "professional" | "review",
) {
  const systemPrompt = generateTaskDescriptionPrompt[type];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 50,
    temperature: 0.7,
  });

  return response.choices[0]?.message.content || "";
}

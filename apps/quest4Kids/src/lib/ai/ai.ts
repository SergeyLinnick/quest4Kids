import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTaskDescription(prompt: string) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You help parents write fun and clear tasks for children aged 6–12. Keep your answers short (max 300 characters) and concise. Use simple words and short sentences.",
      },
      { role: "user", content: prompt },
    ],
  });

  return response.choices[0]?.message.content || "";
}

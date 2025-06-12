import { TASK_LABELS } from "@repo/api";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateTaskSchema = z.object({
  description: z.string().min(1).max(500),
  title: z.string().optional(),
});

const taskResponseSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().min(1).max(300),
  points: z.enum(["5", "8", "10", "15"]),
  status: z.enum(["OPEN"]),
  labels: z.enum(Object.values(TASK_LABELS) as [string, ...string[]]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { description, title } = generateTaskSchema.parse(body);

    const prompt = `Based on the following description, generate a task with a title, description, appropriate points (5, 8, 10, or 15), and a suitable label.
    The task should be engaging and appropriate for children.
    Available labels: ${Object.values(TASK_LABELS).join(", ")}
    
    Description: ${description}
    ${title ? `Suggested title: ${title}` : ""}
    
    Generate a JSON response in the following format:
    {
      "title": "string (max 50 chars)",
      "description": "string (max 300 chars)",
      "points": "5" | "8" | "10" | "15",
      "status": "OPEN",
      "labels": "one of the available labels"
    }`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates engaging tasks for children. Always respond with valid JSON and choose an appropriate label from the provided list.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error("No response from OpenAI");
    }

    const taskData = taskResponseSchema.parse(JSON.parse(response));

    return NextResponse.json(taskData);
  } catch (error) {
    console.error("Error generating task:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input data", details: error.errors },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "Failed to generate task" },
      { status: 500 },
    );
  }
}

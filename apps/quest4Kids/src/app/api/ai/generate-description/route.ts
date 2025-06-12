import { generateTaskDescription } from "@/lib/ai/ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = (body as { title?: unknown }).title;
  const type = (body as { type?: unknown }).type as "polite" | "professional";
  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json({ error: "`title` is required" }, { status: 400 });
  }

  const description = await generateTaskDescription(
    `Create a task description for a child: ${title}`,
    type,
  );

  // const description = "Test description. I don't want to spend money";
  return NextResponse.json({ description });
}

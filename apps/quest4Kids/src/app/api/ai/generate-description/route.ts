import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const title = (body as { title?: unknown }).title;
  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json({ error: "`title` is required" }, { status: 400 });
  }

  // const description = await generateTaskDescription(
  //   `Create a task description for a child: ${title}`,
  // );

  const description = "Test description. I don't want to spend money";
  return NextResponse.json({ description });
}

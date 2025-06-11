import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { title } = body;

  // const description = await generateTaskDescription(
  //   `Create a task description for a child: ${title}`,
  // );

  const description = "Test description. I don't want to spend money";
  return NextResponse.json({ description });
}

import { Heading } from "@radix-ui/themes";
import { TaskForm } from "../TaskForm";

interface AddTaskPageProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function AddTaskPage({ params }: AddTaskPageProps) {
  const { childId } = await params;

  if (!childId) return null;

  return (
    <>
      <Heading mb="6">Add New Task</Heading>
      <TaskForm childId={childId} />
    </>
  );
}

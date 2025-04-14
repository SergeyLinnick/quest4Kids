import { Heading } from "@radix-ui/themes";

interface EditTaskPageProps {
  params: Promise<{
    taskId: string;
  }>;
}

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { taskId } = await params;

  if (!taskId) return null;

  return (
    <>
      <Heading mb="6">
        Edit Task
        <span className="text-sm"> {taskId}</span>
      </Heading>
    </>
  );
}

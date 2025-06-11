import { TicketForm } from "@/components/forms/taskForm/TicketForm";
import { Heading } from "@radix-ui/themes";

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
      <TicketForm childId={childId} />
    </>
  );
}

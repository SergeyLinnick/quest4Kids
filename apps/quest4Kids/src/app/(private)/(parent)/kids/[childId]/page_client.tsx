import { TaskForm } from "@/components/forms/taskForm/taskForm";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;

  return <TaskForm childId={childId} />;
}

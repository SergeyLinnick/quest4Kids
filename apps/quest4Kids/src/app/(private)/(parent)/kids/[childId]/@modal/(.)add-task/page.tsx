import { TaskForm } from "@/components/forms/taskForm/TaskForm";
import { Modal } from "./Modal";

interface AddTaskModalProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function AddTaskModal({ params }: AddTaskModalProps) {
  const { childId } = await params;

  if (!childId) return null;

  return (
    <Modal title="Add Task">
      <TaskForm childId={childId} />
    </Modal>
  );
}

import { TaskForm } from "../../TaskForm";
import { Modal } from "./Modal";

interface AddTaskModalProps {
  params: {
    childId: string;
  };
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

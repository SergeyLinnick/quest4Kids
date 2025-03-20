import { ChangePasswordForm } from "@/components";
import { Modal } from "@repo/ui";

interface ChangePasswordModalProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function ChangePasswordModal({
  params,
}: ChangePasswordModalProps) {
  const { childId } = await params;

  if (!childId) return null;

  return (
    <Modal title="Change Password">
      <ChangePasswordForm id={childId} />
    </Modal>
  );
}

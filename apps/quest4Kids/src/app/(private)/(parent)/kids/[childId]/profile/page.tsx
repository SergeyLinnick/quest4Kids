import { ProfileForm } from "@/components";
import { ROLE } from "@/consts";
import { Heading } from "@radix-ui/themes";

interface AddTaskPageProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function ChildProfilePage({ params }: AddTaskPageProps) {
  const { childId } = await params;

  if (!childId) return null;

  return (
    <>
      <Heading mb="6">Child Profile</Heading>
      <ProfileForm userId={childId} role={ROLE.CHILD} />
    </>
  );
}

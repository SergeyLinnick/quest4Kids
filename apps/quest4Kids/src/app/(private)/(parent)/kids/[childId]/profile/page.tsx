import { AvatarForm } from "@/components";
import { ROLE } from "@/consts";
import { Box, Heading } from "@radix-ui/themes";
import { fetchAvatar, fetchChildById } from "@repo/api";
import { AccountAge, UserCard } from "@repo/ui";

interface AddTaskPageProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function ChildProfilePage({ params }: AddTaskPageProps) {
  const { childId } = await params;
  const childData = await fetchChildById(childId);
  const avatar = await fetchAvatar(childId);

  const childName = childData?.name;
  const createdAt: string | undefined = childData?.createdAt;

  if (!childId) return null;

  return (
    <>
      <Heading mb="6">{childName} profile</Heading>
      <Box maxWidth="400px" mb="5">
        <UserCard user={{ avatar, ...childData }} />
        <AccountAge createdAt={createdAt} />
        <AvatarForm id={childId} role={ROLE.CHILD} />
      </Box>
    </>
  );
}

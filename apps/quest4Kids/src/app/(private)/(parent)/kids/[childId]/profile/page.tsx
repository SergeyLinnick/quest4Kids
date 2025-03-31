import { ProfileFormsComposer } from "@/components";
import { ROLE } from "@/consts";
import { RoleType } from "@/types";
import { Box, Heading } from "@radix-ui/themes";
import { fetchAvatar, fetchChildById } from "@repo/api";
import { auth } from "@repo/auth";
import { AccountAge } from "@repo/ui";
import { notFound } from "next/navigation";

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

  if (!childId) return notFound();

  const session = await auth();
  const currentUserRole: RoleType = session?.user?.role;
  const isParentRole = currentUserRole === ROLE.PARENT;

  return (
    <>
      <Heading mb="6">
        {childName} profile <AccountAge createdAt={createdAt} />
      </Heading>

      <Box maxWidth="400px">
        <ProfileFormsComposer
          id={childId}
          userData={childData}
          avatar={avatar}
          isParentProfile={false}
          isParentRole={isParentRole}
        />
      </Box>
    </>
  );
}

import { AvatarForm, InlineEditProfile } from "@/components";
import { Box, Flex, Heading } from "@radix-ui/themes";
import { fetchAvatar, fetchChildById } from "@repo/api";
import { AccountAge, ButtonLink, UserCard } from "@repo/ui";

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
      <Box maxWidth="400px">
        <UserCard user={{ avatar, ...childData }} />
        <AccountAge createdAt={createdAt} />
        <Flex direction="column" gap="6">
          <InlineEditProfile
            label="Name"
            name="name"
            type="text"
            value={childData.name}
            id={childId}
          />

          <InlineEditProfile
            label="Email"
            name="email"
            type="text"
            value={childData.email}
            id={childId}
          />

          <AvatarForm id={childId} />

          <ButtonLink
            size="1"
            href={`/kids/${childId}/profile/change-password`}
            variant="outline"
          >
            Change current Password
          </ButtonLink>
        </Flex>
      </Box>
    </>
  );
}

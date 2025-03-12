"use server";
import { ProfileForm } from "@/components";
import { ROLE } from "@/consts";
import { Box, Heading } from "@radix-ui/themes";
import { fetchProfile } from "@repo/api";
import { UserCard } from "@repo/ui";

export default async function ProfilePage() {
  const profile = await fetchProfile();
  // const ava = await fetchAvatar(profile.id);

  return (
    <>
      <Heading as="h1" mb="5">
        Your Profile
      </Heading>
      <Box maxWidth="400px" mb="5">
        <UserCard user={profile} isLink />
      </Box>
      <ProfileForm userId={profile.id} role={ROLE.PARENT} />
    </>
  );
}

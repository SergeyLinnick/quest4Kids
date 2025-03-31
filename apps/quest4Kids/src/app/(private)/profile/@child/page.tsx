"use server";
import { ProfileFormsComposer } from "@/components";
import { ROLE } from "@/consts";
import { RoleType } from "@/types";
import { Box, Heading, Text } from "@radix-ui/themes";
import { fetchAvatar, fetchProfile } from "@repo/api";
import { auth } from "@repo/auth";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const childRole: RoleType = ROLE.CHILD;

  const session = await auth();
  const userId = session?.user.id;
  const currentUserRole = session?.user?.role;

  const userData = await fetchProfile();
  const avatar = await fetchAvatar(userId);

  if (currentUserRole === childRole) {
    return (
      <>
        <Heading as="h1" mb="5">
          Your Profile ({userData.name})
          <Text as="span" size="1" color="sky">
            {" "}
            {childRole}
          </Text>
        </Heading>
        <Box maxWidth="400px">
          <ProfileFormsComposer
            id={userId}
            userData={userData}
            avatar={avatar}
            isParentProfile={false}
            isParentRole={false}
          />
        </Box>
      </>
    );
  } else {
    notFound();
  }
}

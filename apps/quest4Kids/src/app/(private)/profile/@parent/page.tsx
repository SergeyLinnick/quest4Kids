"use server";
import { ROLE } from "@/consts";
import { RoleType } from "@/types";
import { Heading, Text } from "@radix-ui/themes";

export default async function ProfilePage() {
  const role: RoleType = ROLE.PARENT;

  return (
    <>
      <Heading as="h1" mb="5">
        Your
        <Text color="mint"> {role} </Text>
        Profile
      </Heading>
    </>
  );
}

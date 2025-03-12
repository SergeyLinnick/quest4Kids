import { ProfileForm } from "@/components";
import { ROLE } from "@/consts";
import { RoleType } from "@/types";

export default async function ProfilePage() {
  const role: RoleType = ROLE.CHILD;

  return (
    <>
      <ProfileForm role={role} />
    </>
  );
}

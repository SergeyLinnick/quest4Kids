import { ProfileForm } from "@/components";
import { ROLE } from "@/consts";

export default async function ProfilePage() {
  return (
    <>
      <ProfileForm role={ROLE.CHILD} userId="" />
    </>
  );
}

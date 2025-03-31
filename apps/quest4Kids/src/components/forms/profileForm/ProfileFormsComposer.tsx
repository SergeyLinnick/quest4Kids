import { AvatarForm, InlineEditProfile } from "@/components";
import { Flex } from "@radix-ui/themes";
import { IChild } from "@repo/api";
import { ButtonLink } from "@repo/ui";
import { notFound } from "next/navigation";

interface ProfileFormsComposerProps {
  id: string;
  userData: IChild;
  avatar: string;
  /**
   * Determines if the profile being edited belongs to a parent.
   * This affects which endpoints and logic are used in the form.
   */
  isParentProfile: boolean;
  isParentRole: boolean;
}

export const ProfileFormsComposer = ({
  id,
  userData,
  avatar,
  isParentProfile,
  isParentRole,
}: ProfileFormsComposerProps) => {
  if (!id) return null;

  if (!id) {
    notFound();
  }

  return (
    <Flex direction="column" gap="6">
      <InlineEditProfile
        label="Name"
        name="name"
        type="text"
        value={userData.name}
        id={id}
        isParentProfile={isParentProfile}
        isDisabled={!isParentRole}
      />

      <InlineEditProfile
        label="Email"
        name="email"
        type="text"
        value={userData.email}
        id={id}
        isParentProfile={isParentProfile}
        isDisabled={!isParentRole}
      />

      <AvatarForm id={id} avatar={avatar} />

      <ButtonLink
        href={`/kids/${id}/profile/change-password`}
        variant="outline"
        disabled={!isParentRole}
      >
        Change Password
      </ButtonLink>
    </Flex>
  );
};

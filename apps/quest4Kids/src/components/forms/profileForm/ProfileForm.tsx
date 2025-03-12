import { RoleType } from "@/types";

import { Box, Heading } from "@radix-ui/themes";

interface ProfileFormProps {
  role: RoleType;
}

export const ProfileForm = ({ role }: ProfileFormProps) => {
  return (
    <Box>
      <Heading>Profile Form {role}</Heading>
    </Box>
  );
};

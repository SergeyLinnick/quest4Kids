import { ChangePasswordForm } from "@/components";
import { Box, Heading } from "@radix-ui/themes";

interface ChangePasswordPageProps {
  params: Promise<{
    childId: string;
  }>;
}

export default async function ChangePasswordPage({
  params,
}: ChangePasswordPageProps) {
  const { childId } = await params;

  if (!childId) return null;

  return (
    <>
      <Heading mb="6">Change Password</Heading>
      <Box width="450px">
        <ChangePasswordForm id={childId} />
      </Box>
    </>
  );
}

"use server";

import { Box, Card, Heading, Text } from "@radix-ui/themes";
import { authOptions } from "@repo/auth";
import { getServerSession } from "next-auth";

export default async function UserDataPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Box>
        <Heading>Not authenticated</Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Heading mb="4">User Data from Session</Heading>

      <Card style={{ padding: "1rem" }}>
        <Heading size="3" mb="3">
          Session User Data:
        </Heading>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(session.user, null, 2)}
        </pre>
      </Card>

      <Card style={{ padding: "1rem", marginTop: "1rem" }}>
        <Heading size="3" mb="3">
          Session Tokens:
        </Heading>
        <Text size="2" color="gray">
          <b>Access Token:</b> {session.accessToken}
        </Text>
        <br />
        <Text size="2" color="gray">
          <b>ID Token:</b> {session.idToken}
        </Text>
        <br />
        <Text size="2" color="gray">
          <b>Refresh Token:</b> {session.refreshToken}
        </Text>
        <br />
        <Text size="2" color="gray">
          <b>Error:</b> {session.error || "None"}
        </Text>
      </Card>
    </Box>
  );
}

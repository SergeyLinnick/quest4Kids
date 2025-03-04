import { Flex, Heading } from "@radix-ui/themes";
import { ButtonLink } from "@repo/ui";
import { getTasks } from "./actions";
import { TasksList } from "./tasksList";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;

  const tasksData = await getTasks(childId).catch((error) => {
    console.error("Error in page:", error);
    return { data: [] };
  });

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="4">{childId}</Heading>
        <ButtonLink href={`/kids/${childId}/add-task`}>Add Task</ButtonLink>
      </Flex>
      <TasksList tasks={tasksData?.data || []} childId={childId} />
    </Flex>
  );
}

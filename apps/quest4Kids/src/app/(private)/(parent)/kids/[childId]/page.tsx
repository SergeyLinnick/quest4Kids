import { Flex, Heading } from "@radix-ui/themes";
import { getTasks } from "./actions";
import { TaskForm } from "./TaskForm";
import { TasksList } from "./tasksList";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;

  const tasksData = await getTasks().catch((error) => {
    console.error("Error in page:", error);
    return { data: [] };
  });

  return (
    <Flex direction="column" gap="4">
      <Heading size="4">{childId}</Heading>
      <TasksList tasks={tasksData?.data || []} />
      <TaskForm childId={childId} />
    </Flex>
  );
}

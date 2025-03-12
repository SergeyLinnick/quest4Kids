import { TasksList } from "@/components";
import { Flex, Heading } from "@radix-ui/themes";
import { fetchChildTasks } from "@repo/api";
import { ButtonLink } from "@repo/ui";
import Link from "next/link";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;

  const tasksData = await fetchChildTasks(childId);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="4">{childId}</Heading>
        <ButtonLink href={`/kids/${childId}/add-task`}>Add Task</ButtonLink>
      </Flex>
      {tasksData?.data?.length > 0 ? (
        <TasksList tasks={tasksData?.data} childId={childId} />
      ) : (
        <>
          <Heading>No tasks found</Heading>
          <Link href={`/kids/${childId}/add-task`}>Add the first task</Link>
        </>
      )}
    </Flex>
  );
}

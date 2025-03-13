import { TasksList } from "@/components";
import { Flex, Heading } from "@radix-ui/themes";
import { fetchChildById, fetchChildTasks } from "@repo/api";
import { ButtonLink } from "@repo/ui";
import Link from "next/link";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;

  const [tasksData, childData] = await Promise.all([
    fetchChildTasks(childId),
    fetchChildById(childId),
  ]);

  return (
    <Flex direction="column" gap="4">
      <Flex justify="between" align="center">
        <Heading size="4">{childData.name}</Heading>
        <div>
          <ButtonLink href={`/kids/${childId}/profile`}>
            Edit Profile
          </ButtonLink>
          <ButtonLink href={`/kids/${childId}/add-task`}>Add Task</ButtonLink>
        </div>
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

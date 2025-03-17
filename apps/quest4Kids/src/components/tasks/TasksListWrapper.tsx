import { Box, Heading } from "@radix-ui/themes";
import { fetchChildTasks } from "@repo/api";
import Link from "next/link";
import { TasksList } from "./TasksList";

interface TasksListWrapperProps {
  childId: string;
  status: string;
  isParent?: boolean;
}

export async function TasksListWrapper({
  childId,
  status,
  isParent = false,
}: TasksListWrapperProps) {
  const tasksData = await fetchChildTasks(childId, { status: status || "" });

  if (tasksData?.data?.length === 0) {
    // TODO: Add Empty component
    return (
      <Box my="5">
        <Heading size="6" mb="4">
          No tasks found
        </Heading>
        {isParent && (
          <Link href={`/kids/${childId}/add-task`}>Add the first task</Link>
        )}
      </Box>
    );
  }

  return (
    <TasksList
      tasks={tasksData?.data}
      childId={childId}
      hideDelete={!isParent}
    />
  );
}

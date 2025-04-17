import { Box, Heading } from "@radix-ui/themes";
import { getTasks } from "@repo/api";
import Link from "next/link";
import { TasksListTanStack } from "./table/TasksListTanStack";
import { TasksList } from "./TasksList";

interface TasksListWrapperProps {
  childId: string;
  status: string;
  isParent?: boolean;
  isDataTable?: boolean;
}

export async function TasksListWrapper({
  childId,
  status,
  isParent = true,
  isDataTable = false,
}: TasksListWrapperProps) {
  const tasksData = await getTasks({ status: status || "", childId });

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
    <>
      {isDataTable ? (
        <TasksListTanStack
          tasks={tasksData?.data}
          childId={childId}
          hideDelete={!isParent}
        />
      ) : (
        <TasksList
          tasks={tasksData?.data}
          childId={childId}
          hideDelete={!isParent}
        />
      )}
    </>
  );
}

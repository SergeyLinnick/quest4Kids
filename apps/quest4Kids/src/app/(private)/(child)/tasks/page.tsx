import { FilterTaskForm } from "@/components/forms/taskForm/FilterTaskForm";
import { TasksListWrapper } from "@/components/tasks/TasksListWrapper";
import { Box, Flex, Grid, Heading, Spinner } from "@radix-ui/themes";
import { auth } from "@repo/auth";
import { Suspense } from "react";

interface TasksPageProps {
  searchParams: Promise<{ status: string }>;
}

export default async function TasksPage({ searchParams }: TasksPageProps) {
  const session = await auth();
  const childId: string = session?.user?.id;
  const isParent = session?.user?.role === "parent";

  const status = (await searchParams).status;

  return (
    <Flex direction="column" gap="6">
      <Heading size="8">My Tasks</Heading>
      <Grid columns="1fr 200px" gapX="9" width="100%">
        <Suspense fallback={<Spinner />}>
          <TasksListWrapper
            childId={childId}
            status={status}
            isParent={isParent}
          />
        </Suspense>
        <Box mt="7">
          <FilterTaskForm />
        </Box>
      </Grid>
    </Flex>
  );
}

import { FilterTaskForm } from "@/components/forms/taskForm/FilterTaskForm";
import { TasksListTanStack } from "@/components/tasks/table/TasksListTanStack";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
import { fetchChildById, prefetchTasks } from "@repo/api";
import { auth } from "@repo/auth";
import { ButtonLink } from "@repo/ui";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
  searchParams: Promise<{ status: string }>;
}

export default async function DataTablePage({
  params,
  searchParams,
}: ChildPageProps) {
  const childId = (await params).childId;
  const status = (await searchParams).status;

  const childData = await fetchChildById(childId);
  const childName = childData?.name;

  const session = await auth();
  const queryClient = new QueryClient();
  await prefetchTasks(queryClient, { childId, status }, session);

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">{childName}</Heading>
        <Flex gap="3">
          <ButtonLink href={`/kids/${childId}/profile`} variant="outline">
            Edit {childName}
          </ButtonLink>
          <ButtonLink href={`/kids/${childId}/add-task`}>Add Task</ButtonLink>
        </Flex>
      </Flex>
      <Grid columns="1fr 200px" gapX="9" width="100%">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TasksListTanStack status={status} childId={childId} />
        </HydrationBoundary>
        <Box mt="7">
          <FilterTaskForm status={status} />
        </Box>
      </Grid>
    </Flex>
  );
}

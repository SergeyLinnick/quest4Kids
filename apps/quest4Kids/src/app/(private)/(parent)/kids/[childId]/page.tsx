import { FilterTaskForm } from "@/components/forms/taskForm/FilterTaskForm";
import { TasksListWrapper } from "@/components/tasks/TasksListWrapper";
import { Box, Flex, Grid, Heading, Spinner } from "@radix-ui/themes";
import { fetchChildById } from "@repo/api";
import { ButtonLink } from "@repo/ui";
import { Suspense } from "react";

interface ChildPageProps {
  params: Promise<{ childId: string }>;
  searchParams: Promise<{ status: string }>;
}

export default async function ChildPage({
  params,
  searchParams,
}: ChildPageProps) {
  const childId = (await params).childId;
  const status = (await searchParams).status;

  const childData = await fetchChildById(childId);
  const childName = childData?.name;

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
        <Suspense fallback={<Spinner />}>
          <TasksListWrapper childId={childId} status={status} />
        </Suspense>
        <Box mt="7">
          <FilterTaskForm />
        </Box>
      </Grid>
    </Flex>
  );
}

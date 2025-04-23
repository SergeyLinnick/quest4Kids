"use client";

import { ITask, useGetTasks } from "@repo/api";
import { Button, DataTable } from "@repo/ui-tw";
import { columns } from "./columns";

interface TasksListTanStackProps {
  childId: string;
  status: string;
}

export const TasksListTanStack = ({
  status,
  childId,
}: TasksListTanStackProps) => {
  const { data, isFetching, refetch, error } = useGetTasks({
    status,
    childId,
  }) as {
    data: { data: ITask[] };
    refetch: () => void;
    isFetching: boolean;
    error: unknown;
  };

  if (error) return <div>Error loading tasks</div>;

  return (
    <div className="table-fixed w-full">
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isFetching}
        filter={{
          columnId: "title",
          placeholder: "Filter by Task Title...",
          className: "max-w-sm",
        }}
      />

      <Button variant="secondary" size="sm" onClick={refetch}>
        Refetch
      </Button>
    </div>
  );
};

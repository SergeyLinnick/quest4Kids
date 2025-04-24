"use client";

import { LIMIT } from "@/consts";
import { useGetTasks } from "@repo/api";
import { Button, DataTable, DataTableError } from "@repo/ui-tw";
import { useState } from "react";
import { columns } from "./columns";

interface TasksListTanStackProps {
  childId: string;
  status: string;
}

export const TasksListTanStack = ({
  status,
  childId,
}: TasksListTanStackProps) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(LIMIT);

  const offset = pageIndex * pageSize;

  const {
    data: tasksData,
    isFetching,
    refetch,
    error,
  } = useGetTasks({
    status,
    childId,
    limit: String(pageSize),
    offset: String(offset),
  });

  if (error) return <DataTableError error={error} refetch={refetch} />;

  return (
    <div className="table-fixed w-full">
      <DataTable
        columns={columns}
        data={tasksData?.data ?? []}
        meta={tasksData?.meta ?? { limit: 1, offset: 0, total: 0 }}
        isLoading={isFetching}
        filter={{
          columnId: "title",
          placeholder: "Filter by Task Title...",
          className: "max-w-sm",
        }}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      <Button variant="secondary" size="sm" onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

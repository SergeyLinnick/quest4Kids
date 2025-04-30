"use client";

import { LIMIT } from "@/consts";
import { useGetTasks } from "@repo/api";
import { Button, DataTable, DataTableError } from "@repo/ui-tw";
import { useState } from "react";
import { columns } from "./columns";

import { SortingState } from "@tanstack/react-table";

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
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: false },
  ]);

  const offset = pageIndex * pageSize;
  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";

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
    sortBy,
    sortOrder,
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
        sorting={sorting}
        setSorting={setSorting}
      />

      <Button variant="secondary" size="sm" onClick={() => refetch()}>
        Refetch
      </Button>
    </div>
  );
};

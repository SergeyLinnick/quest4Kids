"use client";

import { LIMIT } from "@/consts";
import { useGetTasks } from "@repo/api";
import { Button, DataTable, DataTableError } from "@repo/ui-tw";
import { SortingState } from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import { descriptionColumn, titleColumn } from "./filterColumns";
import { useUrlFilters } from "./useUrlFilters";

interface TasksListTanStackProps {
  childId: string;
  status: string;
}

export function TasksListTanStack({ status, childId }: TasksListTanStackProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(LIMIT);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: false },
  ]);

  const filterColumns = [titleColumn(), descriptionColumn()];
  const filterNames = filterColumns.map((col) => col.filterBy);
  const { getActiveFilters } = useUrlFilters(filterNames);
  const filters = getActiveFilters();

  const offset = pageIndex * pageSize;
  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0]?.desc ? "desc" : "asc";

  const activeFilters = Object.entries(filters)
    .filter(([, value]) => value !== null)
    .map(([key, value]) => ({ name: key, value: value as string }));

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
    filter: activeFilters.map((f) => f.value).join(","),
    filterBy: activeFilters.map((f) => f.name).join(","),
  });

  if (error) return <DataTableError error={error} refetch={refetch} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="table-fixed w-full">
        <DataTable
          columns={columns}
          data={tasksData?.data ?? []}
          meta={tasksData?.meta ?? { limit: 1, offset: 0, total: 0 }}
          isLoading={isFetching}
          filterColumns={filterColumns}
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
    </div>
  );
}

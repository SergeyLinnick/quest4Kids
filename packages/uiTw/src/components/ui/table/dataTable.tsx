"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Skeleton } from "../skeleton";
import { DataTableFilter } from "./dataTableFilter";
import { DataTablePagination } from "./dataTablePagination";
import { DataTableViewOptions } from "./dataTableViewOptions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

interface DataTableFilterConfig {
  columnId: string;
  placeholder?: string;
  className?: string;
}

interface DataTableMeta {
  limit: number;
  offset: number;
  total: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta: DataTableMeta;
  isLoading: boolean;
  filter?: DataTableFilterConfig;
  pageIndex?: number;
  setPageIndex?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  sorting: SortingState;
  setSorting: (
    updater: SortingState | ((old: SortingState) => SortingState),
  ) => void;
  onFilterChange?: (value: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  meta = { limit: 1, offset: 0, total: 0 },
  isLoading,
  filter,
  pageIndex = 0,
  setPageIndex,
  pageSize = 10,
  setPageSize,
  sorting,
  setSorting,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(meta.total / pageSize) || 1,
    state: {
      pagination: { pageIndex, pageSize },
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: (updater) => {
      setColumnFilters(updater);
      if (typeof updater === "function") {
        const newFilters = updater(columnFilters);
        const filterValue = newFilters.find((f) => f.id === filter?.columnId)
          ?.value as string;
        onFilterChange?.(filterValue || "");
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <>
      <div className="flex items-center py-4">
        <DataTableFilter
          table={table}
          columnId={filter?.columnId}
          placeholder={filter?.placeholder}
          className={filter?.className}
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <Skeleton className="w-full h-150" />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <DataTablePagination
        table={table}
        meta={meta}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex ?? (() => {})}
        pageSize={pageSize}
        setPageSize={setPageSize ?? (() => {})}
      />
    </>
  );
}

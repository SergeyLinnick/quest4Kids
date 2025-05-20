"use client";

import React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  FilterFnOption,
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

export interface DataTableFilterConfig {
  columnId: string;
  placeholder?: string;
  className?: string;
  filterBy: string;
  filterFn?: FilterFnOption<any>;
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
  filterColumns?: DataTableFilterConfig[];
  pageIndex?: number;
  setPageIndex?: (page: number) => void;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  sorting: SortingState;
  setSorting: (
    updater: SortingState | ((old: SortingState) => SortingState),
  ) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  meta = { limit: 1, offset: 0, total: 0 },
  isLoading,
  filterColumns = [],
  pageIndex = 0,
  setPageIndex,
  pageSize = 10,
  setPageSize,
  sorting,
  setSorting,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

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
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    enableMultiSort: true,
    enableSorting: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,
  });

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          {filterColumns.map((column) => (
            <DataTableFilter
              key={column.columnId}
              table={table}
              columnId={column.columnId}
              placeholder={column.placeholder}
              className={column.className}
              filterBy={column.filterBy}
              filterFn={column.filterFn}
            />
          ))}
        </div>
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
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
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

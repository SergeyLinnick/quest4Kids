"use client";

import { FilterFnOption, Table } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import React, { useEffect } from "react";
import { Input } from "../formFields/input";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  columnId: string | undefined;
  placeholder?: string;
  className?: string;
  filterBy: string;
  filterFn?: FilterFnOption<TData>;
}

export function DataTableFilter<TData>({
  table,
  columnId,
  placeholder = `Filter by ${columnId}...`,
  className,
  filterBy,
  filterFn = "contains" as FilterFnOption<TData>,
}: DataTableFilterProps<TData>) {
  const column = columnId ? table.getColumn?.(columnId) : undefined;
  const [urlFilter, setUrlFilter] = useQueryState(filterBy);

  useEffect(() => {
    if (column) {
      column.columnDef.filterFn = filterFn;
    }
  }, [column, filterFn]);

  useEffect(() => {
    // Sync URL state with column filter state
    if (urlFilter !== null) {
      column?.setFilterValue(urlFilter);
    }
  }, [urlFilter, column]);

  if (!column) {
    console.warn(`DataTableFilter: Column with ID "${columnId}" not found.`);
    return null;
  }

  const filterValue = (column.getFilterValue() as string) ?? "";

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    column.setFilterValue(value);
    setUrlFilter(value || null);
  };

  return (
    <Input
      placeholder={placeholder}
      value={filterValue}
      onChange={handleFilterChange}
      className={className ?? "max-w-sm"}
    />
  );
}

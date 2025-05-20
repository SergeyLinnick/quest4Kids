"use client";

import { Input } from "@repo/ui";
import { Table } from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import React from "react";

interface DataTableFilterProps<TData> {
  table: Table<TData>;
  columnId: string | undefined;
  placeholder?: string;
  className?: string;
}

export function DataTableFilter<TData>({
  table,
  columnId,
  placeholder = `Filter by ${columnId}...`,
  className,
}: DataTableFilterProps<TData>) {
  const column = columnId ? table.getColumn?.(columnId) : undefined;
  const [urlFilter, setUrlFilter] = useQueryState(columnId || "");

  if (!column) {
    console.warn(`DataTableFilter: Column with ID "${columnId}" not found.`);
    return null;
  }

  const filterValue = (column.getFilterValue() as string) ?? urlFilter ?? "";

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    column.setFilterValue(value);
    setUrlFilter(value || null);
  };

  return (
    <Input
      id={columnId || ""}
      placeholder={placeholder}
      value={filterValue}
      onChange={handleFilterChange}
      className={className ?? "max-w-sm"}
    />
  );
}

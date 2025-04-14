"use client";

import { Table } from "@tanstack/react-table";
import React from "react";
import { Input } from "../formFields/input";

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

  if (!column) {
    console.warn(`DataTableFilter: Column with ID "${columnId}" not found.`);
    return null;
  }

  const filterValue = (column.getFilterValue() as string) ?? "";

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    column.setFilterValue(event.target.value);
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

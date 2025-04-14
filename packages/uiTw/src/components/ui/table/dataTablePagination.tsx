import { Table } from "@tanstack/react-table";

import { ArrowLeftIcon } from "../../../components/icons/arrowLeftIcon";
import { ArrowRightIcon } from "../../../components/icons/arrowRightIcon";
import { ArrowsLeftIcon } from "../../../components/icons/arrowsLeftIcon";
import { ArrowsRightIcon } from "../../../components/icons/arrowsRightIcon";
import { Button } from "../button";
import { SelectField } from "../select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const pageSizeOptions = [10, 20, 30, 40, 50].map((size) => ({
    label: `${size}`,
    value: `${size}`,
  }));

  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <SelectField
            name="pageSize"
            label="Rows per page"
            options={pageSizeOptions}
            defaultValue={`${table.getState().pagination.pageSize}`}
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
            classNameTrigger="h-8 w-[70px]"
            error={undefined}
          />
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ArrowsLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeftIcon />
          </Button>
          <SelectField
            name="pagination"
            label="Page"
            defaultValue={table.getState().pagination.pageIndex.toString()}
            onChange={(value) => table.setPageIndex(Number(value))}
            options={Array.from(
              { length: table.getPageCount() },
              (_, index) => ({
                label: `${index + 1}`,
                value: index.toString(),
              }),
            )}
            classNameTrigger="w-15"
            error={undefined}
          />
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

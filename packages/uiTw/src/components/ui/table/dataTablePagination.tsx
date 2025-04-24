import { Table } from "@tanstack/react-table";

import { ArrowLeftIcon } from "../../../components/icons/arrowLeftIcon";
import { ArrowRightIcon } from "../../../components/icons/arrowRightIcon";
import { ArrowsLeftIcon } from "../../../components/icons/arrowsLeftIcon";
import { ArrowsRightIcon } from "../../../components/icons/arrowsRightIcon";
import { Button } from "../button";
import { SelectField } from "../select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageIndex: number;
  setPageIndex: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  meta: {
    limit: number;
    offset: number;
    total: number;
  };
}

export function DataTablePagination<TData>({
  table,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  meta,
}: DataTablePaginationProps<TData>) {
  const total = meta?.total;
  const pageCount = Math.ceil(total / pageSize) || 1;

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
            value={pageSize.toString()}
            onChange={(value) => setPageSize(Number(value))}
            classNameTrigger="h-8 w-[70px]"
            error={undefined}
          />
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to first page</span>
            <ArrowsLeftIcon />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeftIcon />
          </Button>
          <SelectField
            name="pagination"
            label="Page"
            value={pageIndex.toString()}
            onChange={(value) => setPageIndex(Number(value))}
            options={Array.from({ length: pageCount }, (_, index) => ({
              label: `${index + 1}`,
              value: index.toString(),
            }))}
            classNameTrigger="w-15"
            error={undefined}
          />
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex + 1 >= pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRightIcon />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(pageCount - 1)}
            disabled={pageIndex + 1 >= pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

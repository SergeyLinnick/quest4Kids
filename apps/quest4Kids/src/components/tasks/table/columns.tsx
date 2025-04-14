"use client";

import { ITask, TASK_STATUS } from "@repo/api";
import {
  ArrowUpDownIcon,
  Badge,
  Button,
  Checkbox,
  ColumnDef,
  DataTableColumnHeader,
} from "@repo/ui-tw";
import { getTimeDifference } from "@repo/utils";
import { ActionsCell } from "./actionCell";

export const columns: ColumnDef<ITask>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="w-[5%]">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="w-[5%]">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader
        className="w-[20%] min-w-[100px]"
        column={column}
        title="Title"
      />
    ),
    cell: ({ row }) => (
      <div className="w-[20%] min-w-[100px] truncate">
        {row.getValue("title")}
      </div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="w-[35%] min-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: "Coins",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("points"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "uah",
      }).format(amount);

      return <div className="w-[10%]">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex items-center">
        Status
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof TASK_STATUS;
      const color = TASK_STATUS[status]?.color || "gray";

      return (
        <div className="w-[10%]">
          <Badge variant="outline" color={color}>
            {TASK_STATUS[status]?.value || "No Status"}
          </Badge>
        </div>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "labels",
    header: "Labels",
    cell: ({ row }) => {
      const labels = row.getValue("labels") as Array<{
        id: string;
        name: string;
      }>;

      return (
        <div className="w-[15%] flex flex-wrap gap-2">
          {labels.map((label) => (
            <Badge key={label.id} variant="outline">
              {label.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="w-[10%] text-center min-w-[110px]">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated
            <ArrowUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;

      return (
        <div className="w-[10%] text-center min-w-[110px] text-xs">
          {getTimeDifference(updatedAt)}
        </div>
      );
    },
  },

  {
    header: () => <div className="w-[10%] text-right">Actions</div>,
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

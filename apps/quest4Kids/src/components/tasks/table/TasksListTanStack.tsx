"use client";

import { ITask } from "@repo/api";
import { DataTable } from "@repo/ui-tw";
import { columns } from "./columns";

interface TasksListTanStackProps {
  tasks: ITask[];
  childId: string;
  hideDelete?: boolean;
}

export const TasksListTanStack = ({
  tasks,
  // childId,
  // hideDelete = false,
}: TasksListTanStackProps) => {
  return (
    <div className="table-fixed w-full">
      <DataTable
        columns={columns}
        data={tasks}
        filter={{
          columnId: "title",
          placeholder: "Filter by Task Title...",
          className: "max-w-sm",
        }}
      />
    </div>
  );
};

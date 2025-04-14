"use client";

import { ITask } from "@repo/api";
import { Button, DotsIcon, Dropdown, Row } from "@repo/ui-tw";
import { useRouter } from "next/navigation";

interface ActionsCellProps {
  row: Row<ITask>;
}

export const ActionsCell: React.FC<ActionsCellProps> = ({
  row: { original },
}: ActionsCellProps) => {
  const router = useRouter();

  const taskTitle = original.title;
  const taskId = original.id;

  const dropdownOptions = [
    {
      groupLabel: "Actions",
    },
    {
      label: "Copy Task Title",
      value: "copy",
      onClick: () => navigator.clipboard.writeText(taskTitle),
    },
    {
      label: "View Task details",
      value: "viewTask",
      onClick: () => router.push(`/tasks/${taskId}/edit-task`),
    },
  ];

  return (
    <div className="w-[10%]">
      <Dropdown options={dropdownOptions}>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <DotsIcon className="h-4 w-4" />
        </Button>
      </Dropdown>
    </div>
  );
};

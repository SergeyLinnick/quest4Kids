"use client";

import { Button } from "@repo/ui-tw";

interface TasksListTanStackProps {
  error: Error;
  refetch: () => void;
}

export const DataTableError = ({ error, refetch }: TasksListTanStackProps) => {
  if (error)
    return (
      <div className="text-red-600 p-4">
        <strong>Error loading tasks:</strong>{" "}
        {error instanceof Error ? error.message : "Unknown error"}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
          className="ml-4"
        >
          Retry
        </Button>
      </div>
    );
};

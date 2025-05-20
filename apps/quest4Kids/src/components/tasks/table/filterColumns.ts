import { DataTableFilterConfig } from "@repo/ui-tw";
import { FilterFnOption } from "@tanstack/react-table";

export const titleColumn = (): DataTableFilterConfig => ({
  columnId: "title",
  filterBy: "title",
  filterFn: "contains" as FilterFnOption<any>,
  placeholder: "Filter by title...",
});

export const descriptionColumn = (): DataTableFilterConfig => ({
  columnId: "description",
  filterBy: "description",
  filterFn: "fuzzy" as FilterFnOption<any>,
  placeholder: "Filter by description...",
});

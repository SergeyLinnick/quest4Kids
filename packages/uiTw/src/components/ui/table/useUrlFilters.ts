import { useQueryState } from "nuqs";

export const useUrlFilters = () => {
  const [titleFilter, setTitleFilter] = useQueryState("title");
  const [descriptionFilter, setDescriptionFilter] =
    useQueryState("description");

  return {
    titleFilter,
    setTitleFilter,
    descriptionFilter,
    setDescriptionFilter,
  };
};

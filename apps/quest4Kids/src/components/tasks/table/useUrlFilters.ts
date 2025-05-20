import { useQueryState } from "nuqs";

export type FilterState = Record<string, string | null>;

export const useUrlFilters = (filterNames: string[]) => {
  const filterStates = filterNames.reduce(
    (acc, name) => {
      const [value, setValue] = useQueryState(name);
      return {
        ...acc,
        [name]: { value, setValue },
      };
    },
    {} as Record<
      string,
      { value: string | null; setValue: (value: string | null) => void }
    >,
  );

  const getActiveFilters = (): FilterState => {
    return filterNames.reduce(
      (acc, name) => ({
        ...acc,
        [name]: filterStates[name]?.value ?? null,
      }),
      {},
    );
  };

  const clearFilters = () => {
    filterNames.forEach((name) => {
      filterStates[name]?.setValue(null);
    });
  };

  return {
    getActiveFilters,
    clearFilters,
    filterStates,
  };
};

import { PaginatedItems } from "./constants/paginatedItems";
import { SORTING_PROPERTIES } from "./constants/sortingProperties";

export const PaginationSortings = {
  [PaginatedItems.HEARINGS]: {
    [SORTING_PROPERTIES.DEADLINE]: (desc: boolean) => {
      return {
        Property: SORTING_PROPERTIES.DEADLINE,
        Desc: desc ?? false,
      };
    },
    [SORTING_PROPERTIES.STARTDATE]: (desc: boolean) => {
      return {
        Property: SORTING_PROPERTIES.STARTDATE,
        Desc: desc ?? false,
      };
    },
    [SORTING_PROPERTIES.TITLE]: (desc: boolean) => {
      return {
        Property: SORTING_PROPERTIES.TITLE,
        Desc: desc ?? false,
      };
    },
  },
};

import { FILTER_OPERATIONS } from "./constants/filterOperations";
import { FILTER_PROPERTIES } from "./constants/filterProperties";
import { PaginatedItems } from "./constants/paginatedItems";

export const PaginationFilters = {
  [PaginatedItems.HEARINGS]: {
    [FILTER_PROPERTIES.HEARING_STATUS]: (value) => {
      return {
        Property: FILTER_PROPERTIES.HEARING_STATUS,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.HEARING_TYPE]: (value) => {
      return {
        Property: FILTER_PROPERTIES.HEARING_TYPE,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.SUBJECTAREA]: (value) => {
      return {
        Property: FILTER_PROPERTIES.SUBJECTAREA,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.CITYAREA]: (value) => {
      return {
        Property: FILTER_PROPERTIES.CITYAREA,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.HEARING_OWNER]: (value) => {
      return {
        Property: FILTER_PROPERTIES.HEARING_OWNER,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.USER_HEARING_ROLE]: (value) => {
      return {
        Property: FILTER_PROPERTIES.USER_HEARING_ROLE,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.COMPANY_HEARING_ROLE]: (value) => {
      return {
        Property: FILTER_PROPERTIES.COMPANY_HEARING_ROLE,
        Operation: FILTER_OPERATIONS.EQUALS,
        Value: value,
      };
    },
    [FILTER_PROPERTIES.TITLE]: (value) => {
      return {
        Property: FILTER_PROPERTIES.TITLE,
        Operation: FILTER_OPERATIONS.CONTAINS,
        Value: value,
      };
    },
  },
};

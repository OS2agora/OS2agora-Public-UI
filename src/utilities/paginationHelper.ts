import { FILTER_PROPERTIES } from "./constants/filterProperties";
import { DEFAULT_PAGINATION_ENABLED, DEFAULT_PAGINATION_PAGE_SIZE, PaginatedItems } from "./constants/paginatedItems";
import { SORTING_PROPERTIES } from "./constants/sortingProperties";
import { defaultPageFilters } from "./defaultPageFilters";
import { PaginationFilters } from "./paginationFilters";
import { PaginationSortings } from "./paginationSortings";
import { readEnvironmentVariable } from "./environmentHelper";
import { ENV_VARIABLE } from "./constants/environmentVariables";

const getPaginationFilters = (values, property, paginatedItem) => {
  const propertyFilters = PaginationFilters[paginatedItem];
  const filters = [];

  for (const value of values) {
    if (value !== undefined) {
      const newFilter = propertyFilters[property](value);
      filters.push(newFilter);
    }
  }

  return filters;
};

const getPaginationSorting = (sortingProperty, paginatedItem, desc = false) => {
  const propertySortings = PaginationSortings[paginatedItem];
  if (propertySortings === null) {
    return null;
  }

  return propertySortings[sortingProperty](desc);
};

const getDefaultPageFilters = (activePage) => {
  return defaultPageFilters[activePage];
};

const getSubjectAreaFilters = (values) => {
  return getPaginationFilters(values, FILTER_PROPERTIES.SUBJECTAREA, PaginatedItems.HEARINGS);
};

const getCityAreaFilters = (values) => {
  return getPaginationFilters(values, FILTER_PROPERTIES.CITYAREA, PaginatedItems.HEARINGS);
};

const getTitleFilter = (value) => {
  return getPaginationFilters([value], FILTER_PROPERTIES.TITLE, PaginatedItems.HEARINGS);
};

const getFilterForHearings = (activePage, subjectAreas, cityAreas, search) => {
  const defaultFilters = getDefaultPageFilters(activePage);
  const subjectAreaFilters = getSubjectAreaFilters(subjectAreas);
  const cityAreaFilters = getCityAreaFilters(cityAreas);
  const titleFilters = getTitleFilter(search);

  return JSON.stringify([...defaultFilters, ...subjectAreaFilters, ...cityAreaFilters, ...titleFilters]);
};

export const addPaginatedHearingsQueryParameters = (
  params,
  activePage,
  page,
  pageSize,
  subjectAreas,
  cityAreas,
  search
) => {
  params.PageIndex = page;
  params.PageSize = pageSize;

  const subjectAreaValues = Array.isArray(subjectAreas) ? subjectAreas : [subjectAreas];
  const cityAreaValues = Array.isArray(cityAreas) ? cityAreas : [cityAreas];
  params.Filters = getFilterForHearings(activePage, subjectAreaValues, cityAreaValues, search);

  params.OrderBy = JSON.stringify(getPaginationSorting(SORTING_PROPERTIES.DEADLINE, PaginatedItems.HEARINGS));

  return params;
};

export const getPaginationMetaData = (responseData) => {
  return responseData?.data?.meta?.Pagination;
};

const getPageSizeHearings = () => {
  const hearingsPerPage = readEnvironmentVariable(ENV_VARIABLE.PAGE_SIZE_HEARINGS);
  return hearingsPerPage === undefined ? DEFAULT_PAGINATION_PAGE_SIZE : parseInt(hearingsPerPage);
};

const getPageSizeComments = () => {
  const commentsPerPage = readEnvironmentVariable(ENV_VARIABLE.PAGE_SIZE_COMMENTS);
  return commentsPerPage === undefined ? DEFAULT_PAGINATION_PAGE_SIZE : parseInt(commentsPerPage);
};

export const getPageSize = (paginatedItem: PaginatedItems) => {
  if (paginatedItem === PaginatedItems.HEARINGS) {
    return getPageSizeHearings();
  } else if (paginatedItem === PaginatedItems.COMMENTS) {
    return getPageSizeComments();
  }

  return DEFAULT_PAGINATION_PAGE_SIZE;
};

const getPaginateHearingsEnabled = () => {
  const paginateHearingsEnabled = readEnvironmentVariable(ENV_VARIABLE.PAGINATE_HEARINGS);
  return paginateHearingsEnabled === "true";
};

const getPaginateCommentsEnabled = () => {
  const paginateCommentsEnabled = readEnvironmentVariable(ENV_VARIABLE.PAGINATE_COMMENTS);
  return paginateCommentsEnabled === "true";
};

export const getPaginationEnabled = (paginatedItem: PaginatedItems) => {
  if (paginatedItem === PaginatedItems.HEARINGS) {
    return getPaginateHearingsEnabled();
  } else if (paginatedItem === PaginatedItems.COMMENTS) {
    return getPaginateCommentsEnabled();
  }

  return DEFAULT_PAGINATION_ENABLED;
};

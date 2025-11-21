import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";
import { PaginationProps } from "../usePagination";
import { useRouter } from "next/router";
import { addPaginatedHearingsQueryParameters } from "../../utilities/paginationHelper";

const fetchHearings = async (params) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get("hearing", {
    params: params ?? { include: "Contents,Contents.ContentType" },
  });
  return data;
};

const useHearings = (activePage: string, pagination: PaginationProps) => {
  const router = useRouter();
  let params = {
    include: "Contents,Contents.ContentType",
  };

  if (pagination.enabled) {
    const subjectAreas = router.query.subjectArea;
    const cityAreas = router.query.cityArea;
    const search = router.query.search;
    params = addPaginatedHearingsQueryParameters(
      params,
      activePage,
      pagination.currentPage,
      pagination.pageSize,
      subjectAreas,
      cityAreas,
      search
    );
  }

  return useQuery(["hearings", activePage], () => callApi(fetchHearings(params), false), {
    refetchOnWindowFocus: false,
  });
};

export { useHearings, fetchHearings };

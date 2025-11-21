import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";
import { PaginationProps } from "../usePagination";

const fetchComments = async (hearingId: string, params) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`hearing/${hearingId}/comment`, {
    params: params ?? { include: "Contents,Contents.ContentType" },
  });
  return data;
};

const useComments = (hearingId: string, pagination: PaginationProps | null, myCommentsOnly = false) => {
  const params = {
    include: "Contents,Contents.ContentType",
    PageIndex: null as number | null,
    PageSize: null as number | null,
    myCommentsOnly,
  };

  if (pagination?.enabled) {
    params.PageIndex = pagination.currentPage;
    params.PageSize = pagination.pageSize;
  }

  return useQuery(["comments", hearingId, myCommentsOnly], () => callApi(fetchComments(hearingId, params), false), {
    enabled: !!hearingId,
    refetchOnWindowFocus: false,
  });
};

export { useComments, fetchComments };

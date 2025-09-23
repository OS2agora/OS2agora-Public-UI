import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";

const fetchComments = async (hearingId: string) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`hearing/${hearingId}/comment`, {
    params: { include: "Contents,Contents.ContentType" },
  });
  return data;
};

const useComments = (hearingId: string) => {
  return useQuery(["comments", hearingId], () => callApi(fetchComments(hearingId), false), {
    enabled: !!hearingId,
    refetchOnWindowFocus: false,
  });
};

export { useComments, fetchComments };

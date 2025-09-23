import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";

const fetchHearing = async (hearingId: string) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`hearing/${hearingId}`, {
    params: { include: "Contents,Contents.ContentType" },
  });
  return data;
};

const useHearing = (hearingId: string) => {
  return useQuery(["hearing", hearingId], () => callApi(fetchHearing(hearingId), false), {
    enabled: !!hearingId,
    refetchOnWindowFocus: false,
  });
};

export { useHearing, fetchHearing };

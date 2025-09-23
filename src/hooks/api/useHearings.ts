import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";

const fetchHearings = async () => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get("hearing", {
    params: { include: "Contents,Contents.ContentType" },
  });
  return data;
};

const useHearings = () => {
  return useQuery(["hearings"], () => callApi(fetchHearings(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useHearings, fetchHearings };

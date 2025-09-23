import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";
import { fetchHearings } from "./useHearings";

const fetchVersion = async () => {
  const { apiClient } = new ApiClient(false);
  const { data } = await apiClient.get("version");
  return data;
};

const useVersion = () => {
  return useQuery(["version"], () => callApi(fetchVersion(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useVersion, fetchVersion };

import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";

const fetchGlobalContentTypes = async () => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`globalContentType`);
  return data;
};

const useGlobalContentTypes = () => {
  return useQuery(["globalContentTypes"], () => callApi(fetchGlobalContentTypes(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useGlobalContentTypes, fetchGlobalContentTypes };

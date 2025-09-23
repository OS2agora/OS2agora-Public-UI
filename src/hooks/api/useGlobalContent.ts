import { useQuery } from "react-query";

import { ApiClient, callApi } from "../../utilities/apiClient";

const fetchGlobalContent = async (globalContentTypeId: string) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`globalcontent/${globalContentTypeId}/latest`);
  return data;
};

const useGlobalContent = (globalContentTypeId: string | undefined) => {
  return useQuery(
    ["globalContent", globalContentTypeId],
    () => callApi(fetchGlobalContent(globalContentTypeId!), false),
    {
      enabled: !!globalContentTypeId,
      refetchOnWindowFocus: false,
    }
  );
};

export { useGlobalContent, fetchGlobalContent };

import { ApiClient, callApi } from "../../utilities/apiClient";
import { useQuery } from "react-query";

const fetchSubjectAreas = async (): Promise<any> => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get("subjectArea");
  return data;
};

const useSubjectAreas = () => {
  return useQuery(["subjectAreas"], () => callApi(fetchSubjectAreas(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useSubjectAreas, fetchSubjectAreas };

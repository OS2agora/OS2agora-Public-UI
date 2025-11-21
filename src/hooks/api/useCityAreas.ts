import { ApiClient, callApi } from "../../utilities/apiClient";
import { useQuery } from "react-query";

const fetchCityAreas = async (): Promise<any> => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get("cityArea");
  return data;
};

const useCityAreas = () => {
  return useQuery(["cityAreas"], () => callApi(fetchCityAreas(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useCityAreas, fetchCityAreas };

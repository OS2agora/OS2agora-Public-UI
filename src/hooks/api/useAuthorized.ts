import { useQuery } from "react-query";
import { ApiClient } from "../../utilities/apiClient";

const getAuthorized = async () => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`authentication/authorized`);
  return data;
};

const useAuthorized = () => {
  return useQuery(["authorized"], () => getAuthorized(), {
    refetchOnWindowFocus: false,
  });
};

export { useAuthorized, getAuthorized };

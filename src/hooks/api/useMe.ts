import { useQuery } from "react-query";
import { ApiClient } from "../../utilities/apiClient";

const getMe = async () => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`authentication/me`);
  return data;
};

const useMe = () => {
  return useQuery(["me"], () => getMe(), {
    refetchOnWindowFocus: false,
  });
};

export { useMe, getMe };

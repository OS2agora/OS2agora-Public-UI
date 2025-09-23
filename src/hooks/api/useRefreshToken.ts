import { useQuery } from "react-query";
import { ApiClient } from "../../utilities/apiClient";

const getRefreshToken = async () => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get(`authentication/refreshToken`);
  return data;
};

const useRefreshToken = () => {
  return useQuery(["refreshToken"], () => getRefreshToken());
};

export { useRefreshToken, getRefreshToken };

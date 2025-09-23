import { useQuery } from "react-query";
import { ApiClient } from "../../utilities/apiClient";

const renewAccessToken = async (token: string) => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.post(`authentication/renewAccessToken?refreshToken=` + token);
  return data;
};

const useRenewAccessToken = (token: string) => {
  return useQuery(["renewAccessToken", token], () => renewAccessToken(token));
};

export { useRenewAccessToken, renewAccessToken };

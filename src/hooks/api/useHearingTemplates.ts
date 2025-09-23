import { ApiClient, callApi } from "../../utilities/apiClient";
import { useQuery } from "react-query";

const fetchHearingTemplates = async (): Promise<any> => {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.get("hearingTemplate", { params: { include: "Fields,Fields.FieldType" } });
  return data;
};

const useHearingTemplates = () => {
  return useQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), false), {
    refetchOnWindowFocus: false,
  });
};

export { useHearingTemplates, fetchHearingTemplates };

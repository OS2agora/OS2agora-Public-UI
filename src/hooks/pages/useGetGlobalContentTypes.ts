import * as React from "react";
import { EntitySet, GlobalContentTypeModel, buildGlobalContentTypesModel } from "../../utilities/apiHelper";
import { useGlobalContentTypes } from "../api/useGlobalContentTypes";

const useGetGlobalContentTypes = () => {
  const [isFetching, setIsFecthing] = React.useState(false);
  const [globalContentTypes, setGlobalContentTypes] = React.useState<GlobalContentTypeModel[]>([]);

  const { data, isFetching: isFetchingGlobalContentTypes } = useGlobalContentTypes();

  React.useEffect(() => {
    if (typeof data === "undefined" || data?.isDataEmpty) {
      setGlobalContentTypes([]);
    } else {
      const globalContentTypesEntitySet = new EntitySet(data.data);
      const localGlobalContentTypes = buildGlobalContentTypesModel(globalContentTypesEntitySet);
      setGlobalContentTypes(localGlobalContentTypes);
    }
  }, [data]);

  React.useEffect(() => {
    setIsFecthing(isFetchingGlobalContentTypes && !data);
  }, [data, isFetchingGlobalContentTypes]);

  return { globalContentTypes, isFetching };
};

export { useGetGlobalContentTypes };

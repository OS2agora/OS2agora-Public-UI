import * as React from "react";
import { EntitySet, buildGlobalContentModel } from "../../utilities/apiHelper";
import { useGlobalContent } from "../api/useGlobalContent";

const useGetGlobalContent = (globalContentTypeId: string | undefined) => {
  const [globalContent, setGlobalContent] = React.useState<string>();
  const [isFetching, setIsFecthing] = React.useState(false);

  const { data: globalContentData, isFetching: isFetchingGlobalContent } = useGlobalContent(globalContentTypeId);

  React.useEffect(() => {
    if (
      typeof globalContentTypeId === "undefined" ||
      typeof globalContentData === "undefined" ||
      globalContentData?.isDataEmpty
    ) {
      setGlobalContent("");
    } else {
      const globalContentEntitySet = new EntitySet(globalContentData.data);
      const globalContentModel = buildGlobalContentModel(globalContentEntitySet);
      setGlobalContent(globalContentModel.text);
    }
  }, [globalContentData, globalContentTypeId]);

  React.useEffect(() => {
    setIsFecthing(isFetchingGlobalContent && !globalContentData);
  }, [globalContentData, isFetchingGlobalContent]);

  return { globalContent, isFetching };
};

export { useGetGlobalContent };

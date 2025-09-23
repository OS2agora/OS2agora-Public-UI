import * as React from "react";
import { GlobalContentTypeModel } from "../../utilities/apiHelper";

const useGetGlobalContentTypeId = (globalContentTypes: GlobalContentTypeModel[], type: number) => {
  const [id, setId] = React.useState<string>();

  React.useEffect(() => {
    if (globalContentTypes.length > 0) {
      const termsAndConditons = globalContentTypes.find((x) => x.globalContentType === type);
      if (typeof termsAndConditons !== "undefined") {
        setId(termsAndConditons.id);
      }
    }
  }, [globalContentTypes, type]);

  return { id };
};

export { useGetGlobalContentTypeId };

import * as React from "react";

import { useTranslation } from "../../hooks/useTranslation";
import { Hearings } from "../../components/pages/Hearings";
import { useGetMyHearings } from "../../hooks/pages/useGetMyHearings";
import { QueryClient } from "react-query";
import { callApi } from "../../utilities/apiClient";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { dehydrate } from "react-query/hydration";

// Routes to '/myHearings'
export default function MyHearings() {
  const { translate } = useTranslation();
  const { hearings, subjectAreas, isFetching } = useGetMyHearings("myHearings");

  return (
    <Hearings
      hearings={hearings.filter((x) => x !== null)}
      isFetching={isFetching}
      metaTitle={translate("myHearings", "metaTitle")}
      metaDescription={translate("myHearings", "metaDescription")}
      title={translate("myHearings", "title")}
      filter={translate("myHearings", "filter")}
      currentPage="myHearings"
      activeHearingsLabel={translate("activeHearings", "title")}
      activeHearingsPath="activeHearings"
      myHearingsLabel={translate("myHearings", "title")}
      myHearingsPath="myHearings"
      archivedHearingsLabel={translate("archivedHearings", "title")}
      archivedHearingsPath="archivedHearings"
      filterCheckboxLabel={translate("myHearings", "filterCheckboxLabel")}
      filterRadioButtonLabel={translate("myHearings", "filterRadioButtonLabel")}
      filterSubmitText={translate("myHearings", "filterSubmitText")}
      filterTitle={translate("myHearings", "filterTitle")}
      filterCloseButtonLabel={translate("myHearings", "filterCloseButtonLabel")}
      filterCheckboxOptions={subjectAreas}
      searchPlaceholder={translate("myHearings", "searchPlaceholder")}
      searchLabel={translate("myHearings", "searchLabel")}
      readCommentsLabel={translate("myHearings", "readCommentsLabel")}
    />
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds - Every minute
  };
}

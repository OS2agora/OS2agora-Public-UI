import * as React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { Hearings } from "../../components/pages/Hearings";
import { fetchHearings } from "../../hooks/api/useHearings";
import { callApi } from "../../utilities/apiClient";
import { useGetHearings } from "../../hooks/pages/useGetHearings";
import { useTranslation } from "../../hooks/useTranslation";
import { EntitySet, isHearingActive, HearingOverview } from "../../utilities/apiHelper";
import { fetchSubjectAreas } from "../../hooks/api/useSubjectAreas";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";

// Routes to '/activeHearings'
export default function ActiveHearings() {
  const { translate } = useTranslation();

  function filterActiveHearings(hearing: HearingOverview, entitySet: EntitySet): boolean {
    return isHearingActive(hearing.hearingStatus);
  }

  const { hearings, subjectAreas, isFetching } = useGetHearings("activeHearings", filterActiveHearings);

  return (
    <Hearings
      hearings={hearings}
      isFetching={isFetching}
      metaTitle={translate("activeHearings", "metaTitle")}
      metaDescription={translate("activeHearings", "metaDescription")}
      title={translate("activeHearings", "title")}
      filter={translate("activeHearings", "filter")}
      currentPage="activeHearings"
      activeHearingsLabel={translate("activeHearings", "title")}
      activeHearingsPath="activeHearings"
      myHearingsLabel={translate("myHearings", "title")}
      myHearingsPath="myHearings"
      archivedHearingsLabel={translate("archivedHearings", "title")}
      archivedHearingsPath="archivedHearings"
      filterCheckboxLabel={translate("activeHearings", "filterCheckboxLabel")}
      filterRadioButtonLabel={translate("activeHearings", "filterRadioButtonLabel")}
      filterSubmitText={translate("activeHearings", "filterSubmitText")}
      filterTitle={translate("activeHearings", "filterTitle")}
      filterCloseButtonLabel={translate("activeHearings", "filterCloseButtonLabel")}
      filterCheckboxOptions={subjectAreas}
      searchPlaceholder={translate("activeHearings", "searchPlaceholder")}
      searchLabel={translate("activeHearings", "searchLabel")}
    />
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["hearings"], () => callApi(fetchHearings(), true));
  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true));
  await queryClient.prefetchQuery(["subjectAreas"], () => callApi(fetchSubjectAreas(), true));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds - Every minute
  };
}

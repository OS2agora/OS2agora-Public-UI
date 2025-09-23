import * as React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { useTranslation } from "../../hooks/useTranslation";
import { Hearings } from "../../components/pages/Hearings";
import { fetchHearings } from "../../hooks/api/useHearings";
import { EntitySet, isHearingArchived, HearingOverview } from "../../utilities/apiHelper";
import { callApi } from "../../utilities/apiClient";
import { useGetHearings } from "../../hooks/pages/useGetHearings";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { fetchSubjectAreas } from "../../hooks/api/useSubjectAreas";

// Routes to '/archivedHearings'
export default function ArchivedHearings() {
  const { translate } = useTranslation();

  function filterArchivedHearings(hearing: HearingOverview, entitySet: EntitySet): boolean {
    return isHearingArchived(hearing.hearingStatus);
  }

  const { hearings, subjectAreas, isFetching } = useGetHearings("archivedHearings", filterArchivedHearings);

  return (
    <Hearings
      hearings={hearings.filter((x) => x !== null)}
      isFetching={isFetching}
      metaTitle={translate("archivedHearings", "metaTitle")}
      metaDescription={translate("archivedHearings", "metaDescription")}
      title={translate("archivedHearings", "title")}
      filter={translate("archivedHearings", "filter")}
      currentPage="archivedHearings"
      activeHearingsLabel={translate("activeHearings", "title")}
      activeHearingsPath="activeHearings"
      myHearingsLabel={translate("myHearings", "title")}
      myHearingsPath="myHearings"
      archivedHearingsLabel={translate("archivedHearings", "title")}
      archivedHearingsPath="archivedHearings"
      filterCheckboxLabel={translate("archivedHearings", "filterCheckboxLabel")}
      filterRadioButtonLabel={translate("archivedHearings", "filterRadioButtonLabel")}
      filterSubmitText={translate("archivedHearings", "filterSubmitText")}
      filterTitle={translate("archivedHearings", "filterTitle")}
      filterCloseButtonLabel={translate("archivedHearings", "filterCloseButtonLabel")}
      filterCheckboxOptions={subjectAreas}
      searchPlaceholder={translate("archivedHearings", "searchPlaceholder")}
      searchLabel={translate("archivedHearings", "searchLabel")}
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

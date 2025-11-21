import * as React from "react";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Hearings } from "../../components/pages/Hearings";
import { fetchHearings } from "../../hooks/api/useHearings";
import { callApi } from "../../utilities/apiClient";
import { useGetHearings } from "../../hooks/pages/useGetHearings";
import { useTranslation } from "../../hooks/useTranslation";
import { filterActiveHearings } from "../../utilities/apiHelper";
import { fetchSubjectAreas } from "../../hooks/api/useSubjectAreas";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { ACTIVE_HEARINGS_PAGE, MY_HEARINGS_PAGE, ARCHIVED_HEARINGS_PAGE } from "../../utilities/constants/pages";
import { PaginatedItems } from "../../utilities/constants/paginatedItems";
import { usePagination } from "../../hooks/usePagination";
import {
  addPaginatedHearingsQueryParameters,
  getPageSize,
  getPaginationEnabled,
} from "../../utilities/paginationHelper";
import { fetchCityAreas } from "../../hooks/api/useCityAreas";

// Routes to '/activeHearings'
export default function ActiveHearings() {
  const { translate } = useTranslation();
  const pagination = usePagination(PaginatedItems.HEARINGS);
  const { hearings, subjectAreas, cityAreas, isFetching } = useGetHearings(
    ACTIVE_HEARINGS_PAGE,
    filterActiveHearings,
    pagination
  );

  return (
    <Hearings
      hearings={hearings}
      isFetching={isFetching}
      metaTitle={translate(ACTIVE_HEARINGS_PAGE, "metaTitle")}
      metaDescription={translate(ACTIVE_HEARINGS_PAGE, "metaDescription")}
      title={translate(ACTIVE_HEARINGS_PAGE, "title")}
      filter={translate(ACTIVE_HEARINGS_PAGE, "filter")}
      activePage={ACTIVE_HEARINGS_PAGE}
      activeHearingsLabel={translate(ACTIVE_HEARINGS_PAGE, "title")}
      activeHearingsPath={ACTIVE_HEARINGS_PAGE}
      myHearingsLabel={translate(MY_HEARINGS_PAGE, "title")}
      myHearingsPath={MY_HEARINGS_PAGE}
      archivedHearingsLabel={translate(ARCHIVED_HEARINGS_PAGE, "title")}
      archivedHearingsPath={ARCHIVED_HEARINGS_PAGE}
      subjectAreaCheckboxLabel={translate(ACTIVE_HEARINGS_PAGE, "subjectAreaCheckboxLabel")}
      cityAreaCheckboxLabel={translate(ACTIVE_HEARINGS_PAGE, "cityAreaCheckboxLabel")}
      filterRadioButtonLabel={translate(ACTIVE_HEARINGS_PAGE, "filterRadioButtonLabel")}
      filterSubmitText={translate(ACTIVE_HEARINGS_PAGE, "filterSubmitText")}
      filterTitle={translate(ACTIVE_HEARINGS_PAGE, "filterTitle")}
      filterCloseButtonLabel={translate(ACTIVE_HEARINGS_PAGE, "filterCloseButtonLabel")}
      subjectAreaCheckboxOptions={subjectAreas}
      cityAreaCheckboxOptions={cityAreas}
      searchPlaceholder={translate(ACTIVE_HEARINGS_PAGE, "searchPlaceholder")}
      searchLabel={translate(ACTIVE_HEARINGS_PAGE, "searchLabel")}
      pagination={pagination}
    />
  );
}

export async function getStaticProps({ locale }) {
  const queryClient = new QueryClient();

  const paginationEnabled = getPaginationEnabled(PaginatedItems.HEARINGS);
  const pageSize = getPageSize(PaginatedItems.HEARINGS);

  let params = null as any;

  if (paginationEnabled) {
    params = {
      include: "Contents,Contents.ContentType",
    };

    params = addPaginatedHearingsQueryParameters(params, ACTIVE_HEARINGS_PAGE, 1, pageSize, [], [], undefined);
  }

  await queryClient.prefetchQuery(["hearings"], () => callApi(fetchHearings(params), true));
  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true));
  await queryClient.prefetchQuery(["subjectAreas"], () => callApi(fetchSubjectAreas(), true));
  await queryClient.prefetchQuery(["cityAreas"], () => callApi(fetchCityAreas(), true));

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds - Every minute
  };
}

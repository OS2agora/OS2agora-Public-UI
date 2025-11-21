import * as React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "../../hooks/useTranslation";
import { Hearings } from "../../components/pages/Hearings";
import { useGetMyHearings } from "../../hooks/pages/useGetMyHearings";
import { QueryClient } from "react-query";
import { callApi } from "../../utilities/apiClient";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { dehydrate } from "react-query/hydration";
import { MY_HEARINGS_PAGE, ACTIVE_HEARINGS_PAGE, ARCHIVED_HEARINGS_PAGE } from "../../utilities/constants/pages";
import { PaginatedItems } from "../../utilities/constants/paginatedItems";
import { usePagination } from "../../hooks/usePagination";

// Routes to '/myHearings'
export default function MyHearings() {
  const { translate } = useTranslation();
  const pagination = usePagination(PaginatedItems.HEARINGS);
  const { hearings, subjectAreas, cityAreas, isFetching } = useGetMyHearings(MY_HEARINGS_PAGE, pagination);

  return (
    <Hearings
      hearings={hearings.filter((x) => x !== null)}
      isFetching={isFetching}
      metaTitle={translate(MY_HEARINGS_PAGE, "metaTitle")}
      metaDescription={translate(MY_HEARINGS_PAGE, "metaDescription")}
      title={translate(MY_HEARINGS_PAGE, "title")}
      filter={translate(MY_HEARINGS_PAGE, "filter")}
      activePage={MY_HEARINGS_PAGE}
      activeHearingsLabel={translate(ACTIVE_HEARINGS_PAGE, "title")}
      activeHearingsPath={ACTIVE_HEARINGS_PAGE}
      myHearingsLabel={translate(MY_HEARINGS_PAGE, "title")}
      myHearingsPath={MY_HEARINGS_PAGE}
      archivedHearingsLabel={translate(ARCHIVED_HEARINGS_PAGE, "title")}
      archivedHearingsPath={ARCHIVED_HEARINGS_PAGE}
      subjectAreaCheckboxLabel={translate(MY_HEARINGS_PAGE, "subjectAreaCheckboxLabel")}
      cityAreaCheckboxLabel={translate(MY_HEARINGS_PAGE, "cityAreaCheckboxLabel")}
      filterRadioButtonLabel={translate(MY_HEARINGS_PAGE, "filterRadioButtonLabel")}
      filterSubmitText={translate(MY_HEARINGS_PAGE, "filterSubmitText")}
      filterTitle={translate(MY_HEARINGS_PAGE, "filterTitle")}
      filterCloseButtonLabel={translate(MY_HEARINGS_PAGE, "filterCloseButtonLabel")}
      subjectAreaCheckboxOptions={subjectAreas}
      cityAreaCheckboxOptions={cityAreas}
      searchPlaceholder={translate(MY_HEARINGS_PAGE, "searchPlaceholder")}
      searchLabel={translate(MY_HEARINGS_PAGE, "searchLabel")}
      readCommentsLabel={translate(MY_HEARINGS_PAGE, "readCommentsLabel")}
      pagination={pagination}
    />
  );
}

export async function getStaticProps({ locale }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true));

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60, // In seconds - Every minute
  };
}

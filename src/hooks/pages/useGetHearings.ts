import * as React from "react";
import {
  EntitySet,
  HearingOverview,
  createHearingStatusToTextMap,
  buildHearingOverviewModel,
  CheckboxInput,
  mapDataToCheckboxInput,
} from "../../utilities/apiHelper";
import { useHearings } from "../api/useHearings";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";
import { PaginationProps } from "../usePagination";
import { getPaginationMetaData } from "../../utilities/paginationHelper";
import { useCityAreas } from "../api/useCityAreas";

const useGetHearings = (
  activePage: string,
  predicateForShowingHearing: (hearing: HearingOverview, entityset: EntitySet) => boolean,
  pagination: PaginationProps
) => {
  const { translate } = useTranslation();
  const appContext = useAppConfigContext();
  const { data: hearingsData, isFetching: isFetchingHearings } = useHearings(activePage, pagination);
  const { data: hearingTemplateData, isFetching: isFetchingHearingTemplates } = useHearingTemplates();
  const { data: subjectAreaData, isFetching: isFetchingSubjectAreas } = useSubjectAreas();
  const { data: cityAreaData, isFetching: isFetchingCityAreas } = useCityAreas();
  const [subjectAreas, setSubjectAreas] = React.useState<CheckboxInput[]>([]);
  const [cityAreas, setCityAreas] = React.useState<CheckboxInput[]>([]);
  const [hearings, setHearings] = React.useState<HearingOverview[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    if (
      !hearingsData ||
      hearingsData.isDataEmpty ||
      !hearingTemplateData ||
      hearingTemplateData.isDataEmpty ||
      !subjectAreaData ||
      subjectAreaData.isDataEmpty ||
      !cityAreaData ||
      cityAreaData.isDataEmpty
    ) {
      setHearings([]);
    } else {
      const hearingsEntitySet = new EntitySet(
        hearingsData.data,
        hearingTemplateData.data,
        subjectAreaData.data,
        cityAreaData.data
      );
      const hearingLinkText = translate(activePage, "hearingLinkText");

      const deadlineText = translate(activePage, "hearingDeadlineTitle");

      const localSubjectAreas: CheckboxInput[] = [];
      const localCityAreas: CheckboxInput[] = [];

      const hearingStatusToText = createHearingStatusToTextMap(translate);

      const localHearings: HearingOverview[] = hearingsData.data.data.map((hearing: any) => {
        const hearingOverview = buildHearingOverviewModel(
          hearing.id,
          hearingLinkText,
          hearingStatusToText,
          deadlineText,
          hearingsEntitySet
        );

        if (hearingOverview === null) {
          return null;
        }

        const shouldIncludeHearing = predicateForShowingHearing(hearingOverview, hearingsEntitySet);
        if (!shouldIncludeHearing) {
          return null;
        }

        if (!pagination.enabled) {
          const subjectAreaIsRegistered = localSubjectAreas.some(
            (subjectArea) => subjectArea.value === hearingOverview.subjectArea
          );
          if (!subjectAreaIsRegistered) {
            localSubjectAreas.push({
              value: hearingOverview.subjectArea,
              text: hearingOverview.subjectArea,
            });
          }
          const cityAreaIsRegistered = localCityAreas.some((cityArea) => cityArea.value === hearingOverview.cityArea);
          if (!cityAreaIsRegistered && hearingOverview.cityArea) {
            localCityAreas.push({
              value: hearingOverview.cityArea,
              text: hearingOverview.cityArea,
            });
          }
        }
        return hearingOverview;
      });

      const actualHearings = localHearings.filter((hearing) => hearing !== null);
      const hearingsSortedByDeadline = actualHearings.sort((a, b) => {
        return a.deadline.getTime() - b.deadline.getTime();
      });

      if (pagination.enabled) {
        const meta = getPaginationMetaData(hearingsData);
        pagination.setTotalPages(meta?.totalPages ?? 1);
        const allSubjectAreasAsCheckboxInput = mapDataToCheckboxInput(subjectAreaData, "subjectArea");
        const allCityAreasAsCheckboxInput = mapDataToCheckboxInput(cityAreaData, "cityArea");
        localSubjectAreas.push(...allSubjectAreasAsCheckboxInput);
        localCityAreas.push(...allCityAreasAsCheckboxInput);
      }

      setSubjectAreas(localSubjectAreas);
      setCityAreas(localCityAreas);
      setHearings(hearingsSortedByDeadline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activePage,
    hearingsData,
    hearingTemplateData,
    subjectAreaData,
    cityAreaData,
    pagination.totalPages,
    pagination.setTotalPages,
  ]);

  React.useEffect(() => {
    const noData = !hearingsData || !hearingTemplateData || !subjectAreaData || !cityAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingsData?.getStaticPropsMode ||
      hearingTemplateData?.getStaticPropsMode ||
      subjectAreaData?.getStaticPropsMode ||
      cityAreaData?.getStaticPropsMode;
    const isFetchingSomething =
      isFetchingHearings || isFetchingHearingTemplates || isFetchingSubjectAreas || isFetchingCityAreas;
    setIsFetching(
      noData || isAuthorizing || ((!!staticPropMode || isFetchingSomething) && (appContext?.auth.isAuthorized ?? true))
    );
  }, [
    appContext?.app.isReady,
    appContext?.auth.isAuthorized,
    appContext?.auth.isAuthorizing,
    hearingTemplateData,
    hearingsData,
    isFetchingHearingTemplates,
    isFetchingHearings,
    isFetchingSubjectAreas,
    isFetchingCityAreas,
    subjectAreaData,
    cityAreaData,
  ]);

  return { hearings, subjectAreas, cityAreas, isFetching };
};

export { useGetHearings };

import * as React from "react";
import {
  EntitySet,
  HearingOverview,
  createHearingStatusToTextMap,
  buildHearingOverviewModel,
} from "../../utilities/apiHelper";
import { useHearings } from "../api/useHearings";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";

type CheckboxInput = {
  value: string;
  text: string;
};

const useGetHearings = (
  currentPage: string,
  predicateForShowingHearing: (hearing: HearingOverview, entityset: EntitySet) => boolean
) => {
  const { translate } = useTranslation();
  const appContext = useAppConfigContext();
  const { data: hearingsData, isFetching: isFetchingHearings } = useHearings();
  const { data: hearingTemplateData, isFetching: isFetchingHearingTemplates } = useHearingTemplates();
  const { data: subjectAreaData, isFetching: isFetchingSubjectAreas } = useSubjectAreas();
  const [subjectAreas, setSubjectAreas] = React.useState<CheckboxInput[]>([]);
  const [hearings, setHearings] = React.useState<HearingOverview[]>([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    if (
      !hearingsData ||
      hearingsData.isDataEmpty ||
      !hearingTemplateData ||
      hearingTemplateData.isDataEmpty ||
      !subjectAreaData ||
      subjectAreaData.isDataEmpty
    ) {
      setHearings([]);
    } else {
      const hearingsEntitySet = new EntitySet(hearingsData.data, hearingTemplateData.data, subjectAreaData.data);
      const hearingLinkText = translate(currentPage, "hearingLinkText");

      const deadlineText = translate(currentPage, "hearingDeadlineTitle");

      const localSubjectAreas: CheckboxInput[] = [];

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

        const subjectAreaIsRegistered = localSubjectAreas.some(
          (subjectArea) => subjectArea.value === hearingOverview.subjectArea
        );
        if (!subjectAreaIsRegistered) {
          localSubjectAreas.push({
            value: hearingOverview.subjectArea,
            text: hearingOverview.subjectArea,
          });
        }
        return hearingOverview;
      });

      const actualHearings = localHearings.filter((hearing) => hearing !== null);
      const hearingsSortedByDeadline = actualHearings.sort((a, b) => {
        return a.deadline.getTime() - b.deadline.getTime();
      });

      setSubjectAreas(localSubjectAreas);
      setHearings(hearingsSortedByDeadline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, hearingsData, hearingTemplateData, subjectAreaData]);

  React.useEffect(() => {
    const noData = !hearingsData || !hearingTemplateData || !subjectAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingsData?.getStaticPropsMode ||
      hearingTemplateData?.getStaticPropsMode ||
      subjectAreaData?.getStaticPropsMode;
    const isFetchingSomething = isFetchingHearings || isFetchingHearingTemplates || isFetchingSubjectAreas;
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
    subjectAreaData,
  ]);

  return { hearings, subjectAreas, isFetching };
};

export { useGetHearings };

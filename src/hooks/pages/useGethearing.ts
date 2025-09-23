import * as React from "react";
import { EntitySet, createHearingStatusToTextMap, HearingDetails, buildHearingModel } from "../../utilities/apiHelper";
import { useHearing } from "../api/useHearing";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";

const useGetHearing = (hearingId: string) => {
  const { translate } = useTranslation();
  const appContext = useAppConfigContext();
  const { data: hearingData, isFetching: isFetchingHearing, refetch: refetchHearing } = useHearing(hearingId);
  const {
    data: hearingTemplateData,
    isFetching: isFetchingHearingTemplates,
    refetch: refetchTemplate,
  } = useHearingTemplates();
  const { data: subjectAreaData, isFetching: isFetchingSubjectAreas, refetch: refetchSubjectArea } = useSubjectAreas();
  const [hearing, setHearing] = React.useState<HearingDetails>();
  const [isFetching, setIsFetching] = React.useState(true);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const [noAccess, setNoAccess] = React.useState(false);

  React.useEffect(() => {
    if (!appContext?.auth.isAuthorized) {
      return;
    }

    if (hearingData?.getStaticPropsMode && !isFetchingHearing) {
      refetchHearing();
    }
    if (hearingTemplateData?.getStaticPropsMode && !isFetchingHearingTemplates) {
      refetchTemplate();
    }
    if (subjectAreaData?.getStaticPropsMode && !isFetchingSubjectAreas) {
      refetchSubjectArea();
    }
  }, [
    appContext?.auth.isAuthorized,
    hearingData?.getStaticPropsMode,
    hearingTemplateData?.getStaticPropsMode,
    isFetchingHearing,
    isFetchingHearingTemplates,
    isFetchingSubjectAreas,
    refetchHearing,
    refetchSubjectArea,
    refetchTemplate,
    subjectAreaData?.getStaticPropsMode,
  ]);

  React.useEffect(() => {
    if (
      typeof hearingId === "undefined" ||
      !hearingData ||
      hearingData.isDataEmpty ||
      !hearingTemplateData ||
      hearingTemplateData.isDataEmpty ||
      !subjectAreaData ||
      subjectAreaData.isDataEmpty
    ) {
      if (hearingData && !hearingData.getStaticPropsMode && hearingData.isDataEmpty && !appContext?.auth.isAuthorized) {
        setShouldRedirect(true);
      } else if (hearingData?.isDataEmpty && appContext?.auth.isAuthorized) {
        setNoAccess(true);
      }
    } else {
      const hearingEntitySet = new EntitySet(hearingData.data, hearingTemplateData.data, subjectAreaData.data);
      const hearingStatusToText = createHearingStatusToTextMap(translate);
      const localHearing = buildHearingModel(hearingId, hearingStatusToText, hearingEntitySet);
      if (localHearing === null) {
        setHearing(undefined);
        setShouldRedirect(false);
        setNoAccess(true);
      } else {
        setHearing(localHearing);
        setShouldRedirect(false);
        setNoAccess(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext?.auth.isAuthorized, hearingData, hearingTemplateData, subjectAreaData, hearingId]);

  React.useEffect(() => {
    const noData = !hearingData || !hearingTemplateData || !subjectAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingData?.getStaticPropsMode || hearingTemplateData?.getStaticPropsMode || subjectAreaData?.getStaticPropsMode;
    const isFetchingSomething = isFetchingHearing || isFetchingHearingTemplates || isFetchingSubjectAreas;
    setIsFetching(
      noData || isAuthorizing || ((!!staticPropMode || isFetchingSomething) && (appContext?.auth.isAuthorized ?? true))
    );
  }, [
    appContext?.app.isReady,
    appContext?.auth.isAuthorized,
    appContext?.auth.isAuthorizing,
    hearingData,
    hearingTemplateData,
    isFetchingHearing,
    isFetchingHearingTemplates,
    isFetchingSubjectAreas,
    subjectAreaData,
  ]);

  return { hearing, isFetching, shouldRedirect, noAccess };
};

export { useGetHearing };

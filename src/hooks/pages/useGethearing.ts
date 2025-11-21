import * as React from "react";
import {
  EntitySet,
  createHearingStatusToTextMap,
  HearingDetails,
  buildHearingModel,
  doesUserHaveAnyRoleOnHearing,
  doesUserHaveRoleOnHearing,
} from "../../utilities/apiHelper";
import { useHearing } from "../api/useHearing";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";
import { useCityAreas } from "../api/useCityAreas";
import { HEARINGROLE_OWNER } from "../../utilities/constants/api";

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
  const { data: cityAreaData, isFetching: isFetchingCityAreas, refetch: refetchCityArea } = useCityAreas();

  const [hearing, setHearing] = React.useState<HearingDetails>();
  const [isFetching, setIsFetching] = React.useState(true);
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const [noAccess, setNoAccess] = React.useState(false);
  const [isHearingOwner, setIsHearingOwner] = React.useState(false);

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
    if (cityAreaData?.getStaticPropsMode && !isFetchingCityAreas) {
      refetchCityArea();
    }
  }, [
    appContext?.auth.isAuthorized,
    hearingData?.getStaticPropsMode,
    hearingTemplateData?.getStaticPropsMode,
    isFetchingHearing,
    isFetchingHearingTemplates,
    isFetchingSubjectAreas,
    isFetchingCityAreas,
    refetchHearing,
    refetchSubjectArea,
    refetchCityArea,
    refetchTemplate,
    subjectAreaData?.getStaticPropsMode,
    cityAreaData?.getStaticPropsMode,
  ]);

  React.useEffect(() => {
    if (
      typeof hearingId === "undefined" ||
      !hearingData ||
      hearingData.isDataEmpty ||
      !hearingTemplateData ||
      hearingTemplateData.isDataEmpty ||
      !subjectAreaData ||
      subjectAreaData.isDataEmpty ||
      !cityAreaData ||
      cityAreaData.isDataEmpty
    ) {
      if (hearingData && !hearingData.getStaticPropsMode && hearingData.isDataEmpty && !appContext?.auth.isAuthorized) {
        setShouldRedirect(true);
      } else if (hearingData?.isDataEmpty && appContext?.auth.isAuthorized) {
        setNoAccess(true);
      }
      setIsHearingOwner(false);
    } else {
      const hearingEntitySet = new EntitySet(
        hearingData.data,
        hearingTemplateData.data,
        subjectAreaData.data,
        cityAreaData.data
      );
      const hearingStatusToText = createHearingStatusToTextMap(translate);
      const localHearing = buildHearingModel(hearingId, hearingStatusToText, hearingEntitySet);
      const localIsHearingOwner = doesUserHaveRoleOnHearing(
        hearingId,
        HEARINGROLE_OWNER,
        hearingEntitySet,
        appContext.auth?.me.identifier
      );
      if (localHearing === null) {
        setHearing(undefined);
        setShouldRedirect(false);
        setNoAccess(true);
        setIsHearingOwner(false);
      } else {
        setHearing(localHearing);
        setShouldRedirect(false);
        setNoAccess(false);
        setIsHearingOwner(localIsHearingOwner);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext?.auth.isAuthorized, hearingData, hearingTemplateData, subjectAreaData, cityAreaData, hearingId]);

  React.useEffect(() => {
    const noData = !hearingData || !hearingTemplateData || !subjectAreaData || !cityAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingData?.getStaticPropsMode ||
      hearingTemplateData?.getStaticPropsMode ||
      subjectAreaData?.getStaticPropsMode ||
      cityAreaData?.getStaticPropsMode;
    const isFetchingSomething =
      isFetchingHearing || isFetchingHearingTemplates || isFetchingSubjectAreas || isFetchingCityAreas;
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
    isFetchingCityAreas,
    subjectAreaData,
    cityAreaData,
  ]);

  return { hearing, isFetching, shouldRedirect, noAccess, isHearingOwner };
};

export { useGetHearing };

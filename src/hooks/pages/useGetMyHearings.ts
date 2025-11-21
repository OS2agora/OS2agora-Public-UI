import * as React from "react";
import {
  EntitySet,
  HearingOverview,
  createHearingStatusToTextMap,
  EntityReference,
  buildHearingOverviewModel,
  Entity,
  mapDataToCheckboxInput,
} from "../../utilities/apiHelper";
import {
  COMPANY,
  COMPANYHEARINGROLE_RELATIONSHIP,
  HEARING,
  USER,
  USERHEARINGROLES_RELATIONSHIP,
} from "../../utilities/constants/api";
import { useHearings } from "../api/useHearings";
import { useMe } from "../api/useMe";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";
import { PaginationProps } from "../usePagination";
import { getPaginationMetaData } from "../../utilities/paginationHelper";
import { useCityAreas } from "../api/useCityAreas";

type CheckboxInput = {
  value: string;
  text: string;
};

const useGetMyHearings = (activePage: string, pagination: PaginationProps) => {
  const { translate } = useTranslation();
  const appContext = useAppConfigContext();
  const { data: hearingsData, isFetching: isFetchingHearings } = useHearings(activePage, pagination);
  const { data: meData, isFetching: isFetchingMe } = useMe();
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
      cityAreaData.isDataEmpty ||
      !meData ||
      meData.isDataEmpty ||
      appContext?.auth.isAuthorizing
    ) {
      setHearings([]);
    } else if (!appContext?.auth.isAuthorized) {
      setHearings([]);
    } else {
      const hearingLinkText = translate(activePage, "hearingLinkText");

      const deadlineText = translate(activePage, "hearingDeadlineTitle");

      const localSubjectAreas: CheckboxInput[] = [];
      const localCityAreas: CheckboxInput[] = [];

      const hearingStatusToText = createHearingStatusToTextMap(translate);

      const meEntitySet = new EntitySet(meData);

      const myUser = meEntitySet.getAllOfType(USER)[0];
      const myUserHearingRoleReferences = myUser.getRelationships(USERHEARINGROLES_RELATIONSHIP) as EntityReference[];

      const myCompanyReference = myUser.getRelationships(COMPANY) as EntityReference;
      let myCompany = null as Entity | null;

      if (myCompanyReference) {
        myCompany = meEntitySet.getEntityByReference(myCompanyReference);
      }

      const myCompanyHearingRoleReferences =
        (myCompany?.getRelationships(COMPANYHEARINGROLE_RELATIONSHIP) as EntityReference[]) ?? [];

      const hearingsEntitySet = new EntitySet(
        hearingsData.data,
        hearingTemplateData.data,
        subjectAreaData.data,
        cityAreaData.data,
        meData
      );

      const myHearingIds = new Set();

      myUserHearingRoleReferences.forEach((myUserHearingRoleReference) => {
        const myUserHearingRole = hearingsEntitySet.getEntityByReference(myUserHearingRoleReference);
        const hearingReference = myUserHearingRole?.getRelationships(HEARING) as EntityReference | undefined;

        if (typeof hearingReference === "undefined") {
          return;
        }

        const hearingEntity = hearingsEntitySet.getEntityByReference(hearingReference);
        if (hearingEntity) {
          myHearingIds.add(hearingEntity.id);
        }
      });

      myCompanyHearingRoleReferences.forEach((myCompanyHearingRoleReference) => {
        const myCompanyHearingRole = hearingsEntitySet.getEntityByReference(myCompanyHearingRoleReference);
        const hearingReference = myCompanyHearingRole?.getRelationships(HEARING) as EntityReference | undefined;

        if (typeof hearingReference === "undefined") {
          return;
        }

        const hearingEntity = hearingsEntitySet.getEntityByReference(hearingReference);
        if (hearingEntity) {
          myHearingIds.add(hearingEntity.id);
        }
      });

      const localHearings: (HearingOverview | null)[] = hearingsEntitySet.getAllOfType(HEARING).map((hearing: any) => {
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

        if (!myHearingIds.has(hearing.id)) {
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

      const actualHearings = localHearings.flatMap((hearing) => (hearing ? [hearing] : []));
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
    appContext?.auth.isAuthorized,
    appContext?.auth.isAuthorizing,
    activePage,
    hearingsData,
    hearingTemplateData,
    subjectAreaData,
    cityAreaData,
    meData,
  ]);

  React.useEffect(() => {
    const noData = !hearingsData || !hearingTemplateData || !subjectAreaData || !cityAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingsData?.getStaticPropsMode ||
      hearingTemplateData?.getStaticPropsMode ||
      subjectAreaData?.getStaticPropsMode ||
      cityAreaData?.getStaticPropsMode ||
      !meData;
    const isFetchingSomething =
      isFetchingHearings || isFetchingHearingTemplates || isFetchingSubjectAreas || isFetchingCityAreas || isFetchingMe;
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
    isFetchingMe,
    isFetchingSubjectAreas,
    isFetchingCityAreas,
    meData,
    subjectAreaData,
    cityAreaData,
  ]);

  return { hearings, subjectAreas, cityAreas, isFetching };
};

export { useGetMyHearings };

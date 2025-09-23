import * as React from "react";
import {
  EntitySet,
  HearingOverview,
  createHearingStatusToTextMap,
  EntityReference,
  buildHearingOverviewModel,
} from "../../utilities/apiHelper";
import {
  COMPANY,
  COMPANYHEARINGROLE_RELATIONSHIP,
  HEARING,
  USER,
  USERHEARINGROLES_RELATIONSHIP,
} from "../../utilities/constants";
import { useHearings } from "../api/useHearings";
import { useMe } from "../api/useMe";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { useHearingTemplates } from "../api/useHearingTemplates";
import { useSubjectAreas } from "../api/useSubjectAreas";

type CheckboxInput = {
  value: string;
  text: string;
};

const useGetMyHearings = (currentPage: string) => {
  const { translate } = useTranslation();
  const appContext = useAppConfigContext();
  const { data: hearingsData, isFetching: isFetchingHearings } = useHearings();
  const { data: meData, isFetching: isFetchingMe } = useMe();
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
      subjectAreaData.isDataEmpty ||
      !meData ||
      meData.isDataEmpty ||
      appContext?.auth.isAuthorizing
    ) {
      setHearings([]);
    } else if (!appContext?.auth.isAuthorized) {
      setHearings([]);
    } else {
      const hearingLinkText = translate(currentPage, "hearingLinkText");

      const deadlineText = translate(currentPage, "hearingDeadlineTitle");

      const localSubjectAreas: CheckboxInput[] = [];

      const hearingStatusToText = createHearingStatusToTextMap(translate);

      const meEntitySet = new EntitySet(meData);
      const myUser = meEntitySet.getAllOfType(USER)[0];
      const myUserHearingRoleReferences = myUser.getRelationships(USERHEARINGROLES_RELATIONSHIP) as EntityReference[];

      const myCompanyReference = myUser.getRelationships(COMPANY) as EntityReference;
      const myCompany = meEntitySet.getEntityByReference(myCompanyReference);
      const myCompanyHearingRoleReferences = myCompany?.getRelationships(
        COMPANYHEARINGROLE_RELATIONSHIP
      ) as EntityReference[];

      const hearingsEntitySet = new EntitySet(
        hearingsData.data,
        hearingTemplateData.data,
        subjectAreaData.data,
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

      const actualHearings = localHearings.flatMap((hearing) => (hearing ? [hearing] : []));
      const hearingsSortedByDeadline = actualHearings.sort((a, b) => {
        return a.deadline.getTime() - b.deadline.getTime();
      });

      setSubjectAreas(localSubjectAreas);
      setHearings(hearingsSortedByDeadline);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    appContext?.auth.isAuthorized,
    appContext?.auth.isAuthorizing,
    currentPage,
    hearingsData,
    hearingTemplateData,
    subjectAreaData,
    meData,
  ]);

  React.useEffect(() => {
    const noData = !hearingsData || !hearingTemplateData || !subjectAreaData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode =
      hearingsData?.getStaticPropsMode ||
      hearingTemplateData?.getStaticPropsMode ||
      subjectAreaData?.getStaticPropsMode ||
      !meData;
    const isFetchingSomething =
      isFetchingHearings || isFetchingHearingTemplates || isFetchingSubjectAreas || isFetchingMe;
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
    meData,
    subjectAreaData,
  ]);

  return { hearings, subjectAreas, isFetching };
};

export { useGetMyHearings };

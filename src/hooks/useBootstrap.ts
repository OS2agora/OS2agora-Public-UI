import * as React from "react";
import { QueryClient } from "react-query";
import { initialMe } from "../contexts/AppConfig";
import { getAuthorized } from "./api/useAuthorized";
import { getMe } from "./api/useMe";
import { useAppConfigContext } from "./useAppConfig";
import { startRefreshTokenFlow } from "../utilities/refreshTokenFlow";
import { EntityReference, EntitySet } from "../utilities/apiHelper";
import {
  COMPANY,
  IDENTIFIER,
  IS_ADMINISTRATOR,
  IS_HEARINGCREATOR,
  NAME,
  PERSONALIDENTIFIER,
  USER,
} from "../utilities/constants";

export default function useBootstrap(queryClient: QueryClient) {
  const appContext = useAppConfigContext();

  React.useEffect(() => {
    async function asyncWrapper() {
      if (appContext?.app.isReady === false) {
        appContext.setAuth({
          isAuthorized: false,
          isAuthorizing: true,
          me: initialMe,
        });

        let authorized = false;
        try {
          authorized = await getAuthorized();
        } catch (error) {
          // do nothing
        }

        if (authorized) {
          startRefreshTokenFlow();

          const meData = await getMe();
          const meEntitySet = new EntitySet(meData);
          const me = meEntitySet.getAllOfType(USER)[0];
          const myCompanyReference = me.getRelationships(COMPANY) as EntityReference;
          let companyName = undefined as string | undefined;
          if (myCompanyReference !== null) {
            const myCompany = meEntitySet.getEntityByReference(myCompanyReference);
            companyName = myCompany?.getAttribute(NAME)?.toString();
          }
          const displayName = me.getAttribute(NAME);
          const identifier = me.getAttribute(IDENTIFIER);
          const personalIdentifier = me.getAttribute(PERSONALIDENTIFIER);
          const isAdministrator = me.getAttribute(IS_ADMINISTRATOR);
          const isHearingCreator = me.getAttribute(IS_HEARINGCREATOR);

          appContext.setAuth({
            isAuthorized: true,
            isAuthorizing: false,
            me: {
              displayName: String(displayName),
              identifier: String(identifier),
              personalIdentifier: String(personalIdentifier),
              isAdministrator: Boolean(isAdministrator),
              isHearingCreator: Boolean(isHearingCreator),
              companyName,
            },
          });
          queryClient.invalidateQueries();
        } else {
          appContext.setAuth({
            isAuthorized: false,
            isAuthorizing: false,
            me: initialMe,
          });
        }

        appContext.setApp({ isReady: true });
      }
      return undefined;
    }
    asyncWrapper();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appContext.app.isReady]);

  return true;
}

import * as React from "react";
import { useAppConfigContext } from "./useAppConfig";

export default function useIsAuthorized() {
  const appContext = useAppConfigContext();
  const [isAuthorized, setIsAuthorized] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (appContext.app.isReady) {
      if (!appContext.auth.isAuthorizing) {
        setIsAuthorized(appContext.auth.isAuthorized);
      }
    }
  }, [appContext.app.isReady, appContext.auth.isAuthorized, appContext.auth.isAuthorizing]);

  return isAuthorized;
}

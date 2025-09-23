import * as React from "react";
import { useAppConfigContext } from "./useAppConfig";

export default function useIsAppLoading() {
  const appContext = useAppConfigContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (loading && appContext.app.isReady) {
      setLoading(false);
    }
  }, [appContext.app.isReady, loading]);

  return loading;
}

import * as React from "react";
import { isServer } from "../utilities/isServer";

// Simplified version of: https://github.com/mui-org/material-ui/blob/a5586d4d837873a45b391c9912b19cc0ff5701a7/packages/material-ui/src/useMediaQuery/useMediaQuery.js
export default function useMediaQuery(queryInput: string) {
  let query = queryInput;
  query = query.replace(/^@media( ?)/m, "");

  const supportMatchMedia = !isServer && typeof window.matchMedia !== "undefined";

  const matchMedia = supportMatchMedia ? window.matchMedia : null;
  const noSsr = false;

  const [match, setMatch] = React.useState(() => {
    if (noSsr && supportMatchMedia) {
      return matchMedia!(query).matches;
    }
    return false;
  });

  React.useEffect(() => {
    let active = true;

    if (!supportMatchMedia) {
      return undefined;
    }

    const queryList = matchMedia!(query);
    const updateMatch = () => {
      if (active) {
        setMatch(queryList.matches);
      }
    };
    updateMatch();
    queryList.addListener(updateMatch);
    return () => {
      active = false;
      queryList.removeListener(updateMatch);
    };
  }, [query, matchMedia, supportMatchMedia]);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue({ query, match });
  }

  return match;
}

import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";

import "../styles/tailwind.css";
import {
  App,
  AppConfigContext,
  AppConfigContextInterface,
  Auth,
  GlobalMessage,
  initialGlobalmessage,
  initialMe,
  Pagination,
} from "../contexts/AppConfig";
import { QueryClient } from "react-query";

const paginationConfig: Pagination = {
  comments: {
    enabled: true,
    pageSize: 4,
  },
  hearings: {
    enabled: true,
    pageSize: 4,
  },
};

function MyApp({ children }) {
  const [globalMessage, setGlobalmessage] = React.useState<GlobalMessage>(initialGlobalmessage);

  const [app, setApp] = React.useState<App>({ isReady: false });
  const [auth, setAuth] = React.useState<Auth>({
    isAuthorized: false,
    isAuthorizing: false,
    me: initialMe,
  });

  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState("da");

  function doLogin(redirectUri: string, loginAs: number) {
    console.log("doLogin", redirectUri, loginAs);
  }

  function doLogout(redirectUri: string) {
    console.log("doLogin", redirectUri);
  }

  const appConfig: AppConfigContextInterface = {
    app,
    setApp,
    auth,
    setAuth,
    doLogin,
    doLogout,
    language,
    setLanguage,
    globalMessage,
    setGlobalMessage: setGlobalmessage,
    loading,
    setLoading,
    pagination: paginationConfig,
    theme: "Novataris",
  };

  const queryClientRef = React.useRef<QueryClient>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return <AppConfigContext.Provider value={appConfig}>{children}</AppConfigContext.Provider>;
}

export const decorators = [
  (Story) => (
    <MyApp>
      <Story />
    </MyApp>
  ),
  withKnobs,
];

export const parameters = {
  options: {},
};

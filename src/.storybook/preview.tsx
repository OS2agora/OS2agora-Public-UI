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
} from "../contexts/AppConfig";
import { QueryClient } from "react-query";

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

  function doLogin(redirectUri: string) {
    console.log("doLogin", redirectUri);
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
  };

  const queryClientRef = React.useRef<QueryClient>();
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

import React from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";

import { appWithTranslation } from "next-i18next";

import "../styles/tailwind.css";
import {
  AppConfigContext,
  AppConfigContextInterface,
  GlobalMessage,
  App,
  Auth,
  initialGlobalmessage,
  initialMe,
  LoginSettings,
} from "../contexts/AppConfig";
import { LayoutWithTranslations } from "../components/layouts/LayoutWithTranslations";
import { PageLoading } from "../components/atoms/PageLoading";
import { fetchVersion } from "../hooks/api/useVersion";

import { getApiBaseUrl, urlJoin } from "../utilities/apiHelper";
import { PaginatedItems } from "../utilities/constants/paginatedItems";
import { getPageSize, getPaginationEnabled } from "../utilities/paginationHelper";
import { CookieBanner } from "../components/molecules/CookieBanner";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { ENV_VARIABLE } from "../utilities/constants/environmentVariables";
import { readEnvironmentVariable } from "../utilities/environmentHelper";

interface HPWindow extends Window {
  HP_VERSION: {
    fe: string | null;
    be: string | null;
  };
}

// eslint-disable-next-line init-declarations
declare let window: HPWindow;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [globalMessage, setGlobalmessage] = React.useState<GlobalMessage>(initialGlobalmessage);

  const [app, setApp] = React.useState<App>({ isReady: false });
  const [auth, setAuth] = React.useState<Auth>({
    isAuthorized: false,
    isAuthorizing: false,
    me: initialMe,
  });
  const [loginSettings, setLoginSettings] = React.useState<LoginSettings>({ showLoginModal: false, redirectUri: null });

  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState("da");
  const [theme, setTheme] = React.useState(readEnvironmentVariable(ENV_VARIABLE.THEME) ?? "novataris");

  const xApiHeader = readEnvironmentVariable(ENV_VARIABLE.X_API_HEADER);
  const apiUrl = getApiBaseUrl() as string;
  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION;

  const pagination = {
    [PaginatedItems.HEARINGS]: {
      enabled: getPaginationEnabled(PaginatedItems.HEARINGS),
      pageSize: getPageSize(PaginatedItems.HEARINGS),
    },
    [PaginatedItems.COMMENTS]: {
      enabled: getPaginationEnabled(PaginatedItems.COMMENTS),
      pageSize: getPageSize(PaginatedItems.COMMENTS),
    },
  };

  const { didConsent: didCookieConsent, onConsent: onCookieConsent } = useCookieConsent();

  function doLogin(redirectUri: string, loginAs: number) {
    const apiKey = typeof xApiHeader !== "undefined" ? xApiHeader : null;
    router.push({
      pathname: urlJoin(apiUrl, "authentication/Login"),
      query: { redirectUri, loginAs, apiKey },
    });
  }

  function doLogout(redirectUri: string) {
    const apiKey = typeof xApiHeader !== "undefined" ? xApiHeader : null;
    router.push({
      pathname: urlJoin(apiUrl, "authentication/logout"),
      query: { redirectUri, apiKey },
    });
  }

  const setVersion = async () => {
    const data = fetchVersion();
    const be_version: string = await data;
    return { be: be_version, fe: `${buildVersion}` };
  };

  const appConfig: AppConfigContextInterface = {
    app,
    setApp,
    auth,
    setAuth,
    loginSettings,
    setLoginSettings,
    doLogin,
    doLogout,
    language,
    setLanguage,
    globalMessage,
    setGlobalMessage: setGlobalmessage,
    loading,
    setLoading,
    pagination,
    theme,
  };

  const queryClientRef = React.useRef<QueryClient>(undefined);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  }

  // This allows us to implement page-loading indicators.
  React.useEffect(() => {
    setVersion().then(({ be, fe }) => {
      window.HP_VERSION = { fe: fe || null, be: be || null };
    });
    setTheme(readEnvironmentVariable(ENV_VARIABLE.THEME));
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <AppConfigContext.Provider value={appConfig}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <CookieBanner show={!didCookieConsent} onAccept={() => onCookieConsent()} />
          <LayoutWithTranslations>{loading ? <PageLoading /> : <Component {...pageProps} />}</LayoutWithTranslations>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AppConfigContext.Provider>
  );
}

export default appWithTranslation(MyApp);

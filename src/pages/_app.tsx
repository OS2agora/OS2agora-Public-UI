import * as React from "react";

import type { AppProps } from "next/app";
import Router, { useRouter } from "next/router";

import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";

import "../styles/tailwind.css";
import {
  AppConfigContext,
  AppConfigContextInterface,
  GlobalMessage,
  App,
  Auth,
  initialGlobalmessage,
  initialMe,
} from "../contexts/AppConfig";
import { Layout } from "../components/molecules/Layout";
import { TranslationContext } from "../contexts/Translation";

import { da } from "../content/da";
import { en } from "../content/en";
import { PageLoading } from "../components/atoms/PageLoading";
import { fetchVersion } from "../hooks/api/useVersion";

import { getApiBaseUrl, urlJoin } from "../utilities/apiHelper";
import env from "@beam-australia/react-env";

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

  const [loading, setLoading] = React.useState(false);
  const [language, setLanguage] = React.useState("da");

  const xApiHeader = env("X_API_HEADER");
  const apiUrl = getApiBaseUrl() as string;
  const buildVersion = process.env.NEXT_PUBLIC_BUILD_VERSION;

  function doLogin(redirectUri: string) {
    const apiKey = typeof xApiHeader !== "undefined" ? xApiHeader : null;
    router.push({
      pathname: urlJoin(apiUrl, "authentication/CodeFlowLogin"),
      query: { redirectUri, apiKey },
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
    doLogin,
    doLogout,
    language,
    setLanguage,
    globalMessage,
    setGlobalMessage: setGlobalmessage,
    loading,
    setLoading,
  };

  const translations = language === "da" ? da : en;

  const queryClientRef = React.useRef<QueryClient>();
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
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <AppConfigContext.Provider value={appConfig}>
      <TranslationContext.Provider value={translations}>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <Layout
              header={{
                image: { src: "/logo.svg", alt: "Ballerup Kommune Logo" },
                title: "Digital Høringsportal",
                preTitle: "Ballerup Kommune - ",
                loginText: "Log ind",
                logoutText: "Log ud",
                loggedOnBehalfOfText: "På vegne af:",
                myHearingsText: "Mine høringer",
              }}
              footer={{
                image: { src: "/logo-white.png", alt: "Ballerup Kommune Logo" },
                textLines: [
                  "BALLERUP",
                  "KOMMUNE",
                  "Hold-an Vej 7",
                  "2750 Ballerup",
                  "Tlf.: 4477 2000",
                  "Fax.: 4477 2730",
                  "CVR-nr.: 58271713",
                ],
                internalLinks: [
                  { text: "Tilgængelighedserklæring", href: "/was" },
                  { text: "Databeskyttelse", href: "/termsAndConditions" },
                ],
                externalLinks: [
                  { text: "www.ballerup.dk", href: "https://ballerup.dk/" },
                  { text: "Kontakt", href: "https://ballerup.dk/om-kommunen/kontakt-os" },
                ],
              }}
            >
              {loading ? <PageLoading /> : <Component {...pageProps} />}
            </Layout>
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </TranslationContext.Provider>
    </AppConfigContext.Provider>
  );
}

export default MyApp;

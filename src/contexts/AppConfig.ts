import * as React from "react";

interface GlobalMessage {
  title: string;
  text: string;
  multipleLineText?: string[];
  buttonText: string;
  show: boolean;
  onDismiss?: () => void;
}

interface App {
  isReady: boolean;
}

interface Me {
  displayName: string;
  identifier: string;
  personalIdentifier: string;
  isAdministrator: boolean;
  isHearingCreator: boolean;
  companyName: string | undefined;
}

interface Auth {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  me: Me;
}

interface AppConfigContextInterface {
  app: App;
  setApp: React.Dispatch<React.SetStateAction<App>>;
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  doLogin(redirectUri: string): void;
  doLogout(redirectUri: string): void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  globalMessage: GlobalMessage;
  setGlobalMessage: React.Dispatch<React.SetStateAction<GlobalMessage>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialMe = {
  displayName: "",
  identifier: "",
  personalIdentifier: "",
  isAdministrator: false,
  isHearingCreator: false,
  companyName: "",
};
const initialGlobalmessage = { buttonText: "", show: false, text: "", title: "" };
const initialValues: AppConfigContextInterface = {
  app: { isReady: false },
  auth: {
    isAuthorized: false,
    isAuthorizing: false,
    me: initialMe,
  },
  doLogin: () => console.log("Not implemented"),
  doLogout: () => console.log("Not implemented"),
  globalMessage: initialGlobalmessage,
  language: "da",
  loading: false,
  setApp: () => console.log("Not implemented"),
  setAuth: () => console.log("Not implemented"),
  setGlobalMessage: () => console.log("Not implemented"),
  setLanguage: () => console.log("Not implemented"),
  setLoading: () => console.log("Not implemented"),
};

const AppConfigContext = React.createContext<AppConfigContextInterface | null>(initialValues);
AppConfigContext.displayName = "AppConfigContext";

export { AppConfigContext, initialGlobalmessage, initialMe };
export type { GlobalMessage, AppConfigContextInterface, App, Auth, Me };

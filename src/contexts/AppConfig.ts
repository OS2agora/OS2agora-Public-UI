import * as React from "react";
import {
  DEFAULT_PAGINATION_ENABLED,
  DEFAULT_PAGINATION_PAGE_SIZE,
  PaginatedItems,
} from "../utilities/constants/paginatedItems";

interface GlobalMessage {
  title: string;
  text: string;
  multipleLineText?: string[];
  buttonText: string;
  show: boolean;
  disableModal?: boolean;
  canCancel?: boolean;
  cancelButtonText?: string;
  onDismiss?: () => void;
}

interface App {
  isReady: boolean;
}

interface PaginatedItem {
  enabled: boolean;
  pageSize: number;
}

interface Pagination {
  [PaginatedItems.HEARINGS]: PaginatedItem;
  [PaginatedItems.COMMENTS]: PaginatedItem;
}

interface Me {
  displayName: string;
  identifier: string;
  isAdministrator: boolean;
  isHearingCreator: boolean;
  companyName: string | undefined;
}

interface Auth {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  me: Me;
}

interface LoginSettings {
  showLoginModal: boolean;
  redirectUri: string | null;
}

interface AppConfigContextInterface {
  app: App;
  setApp: React.Dispatch<React.SetStateAction<App>>;
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  loginSettings: LoginSettings;
  setLoginSettings: React.Dispatch<React.SetStateAction<LoginSettings>>;
  doLogin(redirectUri: string, loginAs: number): void;
  doLogout(redirectUri: string): void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  globalMessage: GlobalMessage;
  setGlobalMessage: React.Dispatch<React.SetStateAction<GlobalMessage>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  pagination: Pagination;
  theme: string;
}

const defaultPaginatedItem = {
  enabled: DEFAULT_PAGINATION_ENABLED,
  pageSize: DEFAULT_PAGINATION_PAGE_SIZE,
};
const initialMe = {
  displayName: "",
  identifier: "",
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
  loginSettings: {
    showLoginModal: false,
    redirectUri: null,
  },
  setLoginSettings: () => console.log("Not implemented"),
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
  pagination: {
    [PaginatedItems.HEARINGS]: defaultPaginatedItem,
    [PaginatedItems.COMMENTS]: defaultPaginatedItem,
  },
  theme: "novataris",
};

const AppConfigContext = React.createContext<AppConfigContextInterface>(initialValues);
AppConfigContext.displayName = "AppConfigContext";

export { AppConfigContext, initialGlobalmessage, initialMe, defaultPaginatedItem };
export type { GlobalMessage, AppConfigContextInterface, App, Auth, Me, Pagination, LoginSettings };

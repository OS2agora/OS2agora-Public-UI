import * as React from "react";
import { AppConfigContext } from "../contexts/AppConfig";

const useAppConfigContext = () => React.useContext(AppConfigContext);

export { useAppConfigContext };

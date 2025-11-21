import env from "@beam-australia/react-env";
import { ENV_VARIABLE } from "../../utilities/constants/environmentVariables";
import { readEnvironmentVariable } from "../../utilities/environmentHelper";

interface ThemeImage {
  default: string | null;
  value: string;
}

interface Images {
  mainLogo: ThemeImage;
  headerLogo: ThemeImage;
  footerLogo: ThemeImage;
  fallbackImage: ThemeImage;
}

interface ThemeImages {
  mainLogo: string;
  headerLogo: string;
  footerLogo: string;
  fallbackImage: string;
}

const mainLogo: ThemeImage = {
  default: "mainLogo.png",
  value: readEnvironmentVariable(ENV_VARIABLE.MAIN_LOGO),
};

const fallbackImage: ThemeImage = {
  default: "fallbackImage.png",
  value: readEnvironmentVariable(ENV_VARIABLE.FALLBACKIMAGE),
};

const headerLogo: ThemeImage = {
  default: null,
  value: readEnvironmentVariable(ENV_VARIABLE.HEADER_LOGO),
};

const footerLogo: ThemeImage = {
  default: null,
  value: readEnvironmentVariable(ENV_VARIABLE.FOOTER_LOGO),
};

const images: Images = {
  mainLogo,
  fallbackImage,
  headerLogo,
  footerLogo,
};

export type { ThemeImages };
export { images };

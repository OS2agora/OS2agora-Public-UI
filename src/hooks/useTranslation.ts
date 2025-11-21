import { useTranslation as usei18n } from "next-i18next";
import { useAppConfigContext } from "./useAppConfig";

function useTranslation() {
  const appContext = useAppConfigContext();
  const theme = appContext?.theme;
  const { t: i18ntranslate } = usei18n([theme, "default"]);

  function translate(page: string, key: string): string {
    let output = i18ntranslate(`${page}.${key}`);
    if (output === `${page}.${key}`) {
      output = i18ntranslate(`default:${page}.${key}`);
    }
    return output;
  }

  function translateWithReplace(page: string, key: string, searchValue: string, replaceValue: string) {
    const translation = translate(page, key);
    return translation.replace(searchValue, replaceValue);
  }

  return { translate, translateWithReplace };
}

export { useTranslation };

import { useContext } from "react";
import { TranslationContext } from "../contexts/Translation";

function useTranslation() {
  const translationContext = useContext(TranslationContext);

  function translate(page: string, key: string): string {
    const translatedPage = translationContext![page];

    if (translatedPage === null) {
      return "Missing Translation Provider";
    }

    if (typeof translatedPage === "undefined" || translatedPage === null) {
      return `Missing translation for page: ${page}`;
    }

    const translatedKey = translatedPage[key];
    if (typeof translatedKey === "undefined" || translatedKey === null) {
      return `Missing translation for key: ${key} on page: ${page}`;
    }
    return translatedKey;
  }

  function translateWithReplace(page: string, key: string, searchValue: string, replaceValue: string) {
    const translation = translate(page, key);
    return translation.replace(searchValue, replaceValue);
  }

  return { translate, translateWithReplace };
}

export { useTranslation };

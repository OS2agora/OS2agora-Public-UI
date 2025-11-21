import React, { useCallback, useMemo } from "react";
import { useAppConfigContext } from "./useAppConfig";

type IFiles = {
  prettyName: string;
  mime: string;
  extensions: string[];
};

type ICommentValidationRules = {
  maximumFileSize: number;
  maximumFileCount: number;
  maxFileNameLength: number;
  allowedFileTypes?: IFiles[];
};

const defaultCommentValidationRulesConfiguration: ICommentValidationRules = {
  maximumFileCount: 10,
  maximumFileSize: 10,
  maxFileNameLength: 150,
  allowedFileTypes: undefined, // default behaviour is to not validate file types
};

const commentValidationRulesConfiguration: { [theme: string]: Partial<ICommentValidationRules> } = {
  ballerup: {},
  kobenhavn: {
    allowedFileTypes: [
      { prettyName: "pdf", mime: "application/pdf", extensions: [".pdf"] },
      { prettyName: "jpeg", mime: "image/jpeg", extensions: [".jpeg", ".jpg"] },
      { prettyName: "png", mime: "image/png", extensions: [".png"] },
    ],
  },
  novataris: {},
  os2: {},
};

const useCommentValidationConfiguration = (): {
  rules: ICommentValidationRules;
  allowedMimes?: Set<string>;
  allowedFileTypesPrettyNames?: string[];
  isValidFileExtension: (fileName: string) => boolean;
} => {
  const appContext = useAppConfigContext();
  const theme = appContext?.theme ?? "default";

  const validationRules = useMemo(() => {
    if (theme in commentValidationRulesConfiguration) {
      return {
        ...defaultCommentValidationRulesConfiguration,
        ...commentValidationRulesConfiguration[theme],
      };
    }
    return defaultCommentValidationRulesConfiguration;
  }, [theme]);

  const allowedMimes = useMemo(() => {
    if (validationRules.allowedFileTypes) {
      return new Set(validationRules.allowedFileTypes.map((x) => x.mime));
    } else {
      return undefined;
    }
  }, [validationRules]);

  const allowedFileTypesPrettyNames = useMemo(() => {
    if (validationRules.allowedFileTypes) {
      return validationRules.allowedFileTypes.map((x) => x.prettyName);
    }
    return undefined;
  }, [validationRules]);

  const isValidFileExtension = useCallback(
    (fileName: string): boolean => {
      // all extensions are valid when no file types are configured
      if (typeof validationRules.allowedFileTypes === "undefined") {
        return true;
      }
      const validFileExtensions = validationRules.allowedFileTypes?.map((fileType) => fileType.extensions).flat();
      return validFileExtensions.some((fileExtension) => fileName.toLowerCase().endsWith(fileExtension));
    },
    [validationRules]
  );

  return {
    rules: validationRules,
    allowedMimes,
    allowedFileTypesPrettyNames,
    isValidFileExtension,
  };
};

export default useCommentValidationConfiguration;

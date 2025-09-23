import { AppConfigContextInterface } from "../contexts/AppConfig";

function requireLoginMessage(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onDismiss: () => void
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "loginRequiredTitle"),
    text: translate("global", "loginRequiredText"),
    buttonText: translate("global", "loginRequiredButton"),
    onDismiss,
  });
}

function fileUploadError(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string | null,
  fileNames: string[]
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "fileUploadErrorTitle"),
    text: translate("global", "fileUploadErrorText"),
    multipleLineText: fileNames,
    buttonText: translate("global", "fileUploadErrorButton"),
  });
}

function commentCreated(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onDismiss: () => void
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "commentCreatedTitle"),
    text: translate("global", "commentCreatedText"),
    buttonText: translate("global", "commentCreatedButton"),
    onDismiss,
  });
}

function commentError(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onDismiss: () => void,
  text: string[]
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "commentUploadFilesErrorTitle"),
    text: translate("global", "commentUploadFilesErrorText"),
    multipleLineText: text,
    buttonText: translate("global", "commentErrorButton"),
    onDismiss,
  });
}

function commentDeleted(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onDismiss: () => void
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "commentDeletedTitle"),
    text: translate("global", "commentDeletedText"),
    buttonText: translate("global", "commentDeletedButton"),
    onDismiss,
  });
}

function commentUpdated(
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onDismiss: () => void
) {
  appContext.setGlobalMessage({
    show: true,
    title: translate("global", "commentUpdatedTitle"),
    text: translate("global", "commentUpdatedText"),
    buttonText: translate("global", "commentUpdatedButton"),
    onDismiss,
  });
}

export { requireLoginMessage, commentCreated, commentError, commentDeleted, commentUpdated, fileUploadError };

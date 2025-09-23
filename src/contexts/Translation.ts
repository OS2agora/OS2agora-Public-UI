import * as React from "react";

interface FrontPageTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  imageAlt: string;
  card1Title: string;
  card1Text: string;
  card1AriaLabel: string;
  card2Title: string;
  card2Text: string;
  card2AriaLabel: string;
  card3Title: string;
  card3Text: string;
  card3AriaLabel: string;
}

interface GlobalTexts {
  [index: string]: string | null;
  loginRequiredTitle: string;
  loginRequiredText: string;
  loginRequiredButton: string;
  fileUploadErrorTitle: string;
  fileUploadErrorText: string;
  fileUploadErrorButton: string;
  commentCreatedTitle: string;
  commentCreatedText: string;
  commentCreatedButton: string;
  commentErrorTitle: string;
  commentErrorText: string;
  commentUploadFilesErrorTitle: string;
  commentUploadFilesErrorText: string;
  commentErrorButton: string;
  commentDeletedTitle: string;
  commentDeletedText: string;
  commentDeletedButton: string;
  commentUpdatedTitle: string;
  commentUpdatedText: string;
  commentUpdatedButton: string;
  pageLoadingText: string;
  awaitingStartdateText: string;
  activeStatusText: string;
  awaitingConclusionStatusText: string;
  concludedStatusText: string;
}

interface AccessdeniedTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  title: string;
  text: string;
  buttonText: string;
  imageAlt: string;
}

interface HearingsOverviewPageTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  title: string;
  filter: string;
  filterCheckboxLabel: string;
  filterRadioButtonLabel: string;
  filterSubmitText: string;
  filterTitle: string;
  filterCloseButtonLabel: string;
  searchPlaceholder: string;
  searchLabel: string;
  hearingLinkText: string;
  hearingDeadlineTitle: string;
  noHearingsTitle: string;
  noHearingsText: string;
  readCommentsLabel?: string;
}

interface HearingsPageTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  startDateTitle: string;
  endDateTitle: string;
  statusTitle: string;
  summary: string;
  bodyInformationText: string;
  bodyInformationFiles: string;
  conclusionText: string;
  generalInformation: string;
  contactInformation: string;
  seeHearingAnswersButton: string;
  answerHearingButton: string;
  subjectArea: string;
  status: string;
  caseNumber: string;
  department: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  noAccessTitle: string;
  noAccessText: string;
}

interface CommentsPageTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  startDateTitle: string;
  endDateTitle: string;
  statusTitle: string;
  summary: string;
  hearingAnswer: string;
  commentNumber: string;
  readHearingButton: string;
  answerHearingButton: string;
  noHearingAnswers: string;
  hiddenHearingAnswers: string;
  noAccessTitle: string;
  noAccessText: string;
  onBehalfOfLabel: string;
  deleteCommentTooltip: string;
  editCommentTooltip: string;
}

interface AnswerPageTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  startDateTitle: string;
  endDateTitle: string;
  statusTitle: string;
  summary: string;
  hearingAnswer: string;
  postHearingAnswerButton: string;
  answerOnBehalfOf: string;
  onBehalfOfPlaceholder: string;
  writeHearingAnswerPlaceholder: string;
  attachFiles: string;
  buttonFileUpload: string;
  dropFileUpload: string;
  dropFileUploadDrop: string;
  termsAndConditionsLabel: string;
  termsAndConditions: string;
  termsAndConditionsTitle: string;
  termsAndConditionsAccept: string;
  noAccessTitle: string;
  noAccessText: string;
  onBehalfOfLabel: string;
  hearingAnswerLabel: string;
  hearingAnswerHelperText: string;
  maximumFileSize: string;
}

interface TermsAndConditionsTexts {
  [index: string]: string | null;
  metaTitle: string;
  metaDescription: string;
  title: string;
}

interface TranslationContextInterface {
  [index: string]:
    | FrontPageTexts
    | GlobalTexts
    | AccessdeniedTexts
    | HearingsOverviewPageTexts
    | HearingsPageTexts
    | CommentsPageTexts
    | AnswerPageTexts
    | TermsAndConditionsTexts
    | null;
  frontpage: FrontPageTexts;
  global: GlobalTexts;
  accessdenied: AccessdeniedTexts;
  activeHearings: HearingsOverviewPageTexts;
  archivedHearings: HearingsOverviewPageTexts;
  myHearings: HearingsOverviewPageTexts;
  hearing: HearingsPageTexts;
  comments: CommentsPageTexts;
  answer: AnswerPageTexts;
}

const TranslationContext = React.createContext<TranslationContextInterface | null>(null);
TranslationContext.displayName = "TranslationContext";

export { TranslationContext };
export type { TranslationContextInterface };

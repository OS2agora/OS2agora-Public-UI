import * as React from "react";

import Head from "next/head";
import { ErrorMessage, Form, Formik } from "formik";

import { Container } from "../atoms/Container";
import { TitleBar } from "../molecules/TitleBar";
import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Hearingbar } from "../molecules/Hearingbar";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";
import { HearingDetails, TermsAndConditions } from "../../utilities/apiHelper";
import { useTranslation } from "../../hooks/useTranslation";
import { NavigationBar } from "../atoms/NavigationBar";
import { Button } from "../atoms/Button";
import { FormControl } from "../atoms/FormControl";
import { FormLabel } from "../atoms/FormLabel";
import { Caption } from "../atoms/Caption";
import { Checkbox } from "../atoms/Checkbox";
import { Input } from "../atoms/Input";
import { Textarea } from "../atoms/Textarea";
import { ButtonFileUpload } from "../molecules/ButtonFileUpload";
import { DropFileUpload } from "../molecules/DropFileUpload";
import { File as FileAtom } from "../../components/atoms/File";
import { Summary } from "../renderHearing/fields";
import ReactMarkdown from "react-markdown";
import { SubHeader } from "../atoms/SubHeader";
import { fileUploadError } from "../../utilities/globalMessage";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { ImageRenderer } from "../atoms/ImageRenderer";
import { useImages } from "../../hooks/useImages";
import useCommentValidationConfiguration from "../../hooks/useCommentValidationConfiguration";

type AnswerHearingForm = {
  showOnBehalfOf: boolean;
  onBehalfOf: string;
  hearingAnswer: string;
  files: File[];
  conditions: boolean;
};

type AnswerHearingProps = {
  hearing: HearingDetails;
  termsAndCondtions: TermsAndConditions;
  initialComment: AnswerHearingForm;
  showResponseLimitWarning: boolean;
  submit: (values: AnswerHearingForm) => void;
};

const AnswerHearing = ({
  hearing,
  termsAndCondtions,
  initialComment,
  showResponseLimitWarning,
  submit,
}: AnswerHearingProps) => {
  const { translate, translateWithReplace } = useTranslation();
  const appContext = useAppConfigContext();
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const images = useImages();
  const validationConfig = useCommentValidationConfiguration();
  const [imageError, setImageError] = React.useState(false);
  const [seeConditions, setSeeCondtions] = React.useState(false);

  const fallbackImage = imageError ? images?.fallbackImage : hearing.image || images?.fallbackImage;

  const HeadlineComponent = largeDevice ? Headline : Title;

  const { maximumFileCount, maximumFileSize, maxFileNameLength, allowedFileTypes } = validationConfig.rules;

  const scrollRef = React.useRef(null);
  const scrollToPostHearingAnswerButton = () => scrollRef.current.scrollIntoView();

  const onFileUploadError = (files: File[]) => {
    fileUploadError(
      appContext,
      translate,
      files.map((file) => file.name)
    );
  };

  const renderPersonalInfoText = () => {
    const personalInfoHeader = translate("answer", "personalInfoHeader");
    const personalInfoText1 = translate("answer", "personalInfoText1");
    const personalInfoText2 = translate("answer", "personalInfoText2");
    const personalInfoText3 = translate("answer", "personalInfoText3");

    const shouldRender = !!personalInfoHeader && (!!personalInfoText1 || !!personalInfoText2 || personalInfoText3);

    return shouldRender ? (
      <>
        <SubHeader classes="mt-6 tablet:mt-8" type="heavy">
          {personalInfoHeader}
        </SubHeader>

        {[personalInfoText1, personalInfoText2, personalInfoText3].map((infoText, index) =>
          infoText ? (
            <SubHeader classes="mt-2" type="light" key={index}>
              {infoText}
            </SubHeader>
          ) : null
        )}
      </>
    ) : null;
  };

  return (
    <div className="flex-1">
      <Head>
        <title>{translateWithReplace("answer", "metaTitle", "##hearing##", hearing.title!)}</title>
        <meta
          name="Description"
          content={translateWithReplace("answer", "metaDescription", "##hearing##", hearing.title!)}
        ></meta>
      </Head>

      <main className="mt-8 desktop:mt-12">
        <Container>
          <TitleBar title={hearing.title!} />
        </Container>
        {!smallDevice && (
          <div className="relative overflow-hidden tablet:mt-6 tablet:h-40 desktop:h-64 w-full">
            <ImageRenderer
              src={fallbackImage}
              onError={() => setImageError(true)}
              alt={hearing.imageAlt || "Billede"}
              aspectRatio={3.3}
            />
          </div>
        )}
        <Hearingbar
          classes="mt-6 tablet:mt-0"
          startDateTitle={translate("hearing", "startDateTitle")}
          starteDate={hearing.startDate}
          statusTitle={translate("hearing", "statusTitle")}
          statusText={hearing.statusText}
          endDateTitle={translate("hearing", "endDateTitle")}
          endDate={hearing.deadline}
        />
        <Container classes="tablet:max-w-tablet-hearing-content desktop:max-w-desktop-hearing-content">
          <Formik
            initialValues={initialComment}
            validate={(values: AnswerHearingForm) => {
              if (!values.hearingAnswer || !values.hearingAnswer.trim()) {
                return { hearingAnswer: translate("answer", "emptyAnswerText") };
              }
              if (values.files?.some((f) => f.name.length > maxFileNameLength)) {
                return { files: translate("answer", "fileNameExceedsLimit") };
              }
              if (allowedFileTypes && values.files?.some((f) => !validationConfig.isValidFileExtension(f.name))) {
                return {
                  files: `${translate(
                    "answer",
                    "invalidFileFormatErrorText"
                  )} ${validationConfig.allowedFileTypesPrettyNames?.join(", ")}`,
                };
              }
            }}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              submit(values);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, dirty, isSubmitting, isValid, submitCount }) =>
              seeConditions ? (
                <>
                  <HeadlineComponent type="heavy" classes="mt-10 tablet:mt-16">
                    {translate("answer", "termsAndConditionsTitle")}
                  </HeadlineComponent>
                  <ReactMarkdown
                    source={termsAndCondtions.text!}
                    // className markdown is used in custom.css
                    className="markdown mt-2 tablet:mt-4"
                  />
                  <NavigationBar fixed={false} classes="mt-9 tablet:mt-12 mb-20">
                    <Button
                      variant="secondary"
                      classes="grow"
                      onClick={() => {
                        setSeeCondtions(false);
                        scrollToPostHearingAnswerButton();
                      }}
                    >
                      {translate("answer", "termsAndConditionsCancelButton")}
                    </Button>
                    <Button
                      variant="primary"
                      classes="grow"
                      onClick={() => {
                        setSeeCondtions(false);
                        setFieldValue("conditions", true, false);
                        scrollToPostHearingAnswerButton();
                      }}
                    >
                      {translate("answer", "termsAndConditionsAcceptButton")}
                    </Button>
                  </NavigationBar>
                </>
              ) : (
                <>
                  <Summary fieldData={hearing.summaryField!} />
                  {showResponseLimitWarning && (
                    <div className="mt-10">
                      <SubHeader type="heavy" colorMode="error">
                        {translate("comments", "responseLimitWarningText")}
                      </SubHeader>
                    </div>
                  )}
                  <Form className="mt-10">
                    <FormControl>
                      <FormLabel>{translate("answer", "hearingAnswer")}</FormLabel>
                      <div className="mt-4">
                        <Checkbox name="showOnBehalfOf" single>
                          <Caption type="large">{translate("answer", "answerOnBehalfOf")}</Caption>
                        </Checkbox>
                      </div>
                      {values.showOnBehalfOf ? (
                        <Input
                          name="onBehalfOf"
                          placeholder={translate("answer", "onBehalfOfPlaceholder")}
                          classes="mt-4"
                        >
                          {translate("answer", "onBehalfOfLabel")}
                        </Input>
                      ) : null}
                      <SubHeader classes="mt-6 tablet:mt-8" type="light">
                        {translate("answer", "hearingAnswerHelperText")}
                      </SubHeader>
                      {renderPersonalInfoText()}
                      <Textarea
                        name="hearingAnswer"
                        placeholder={translate("answer", "writeHearingAnswerPlaceholder")}
                        classes="mt-4"
                      >
                        {translate("answer", "hearingAnswerLabel")}
                      </Textarea>
                      <ErrorMessage name="hearingAnswer" component="div" className="text-red italic" />
                      <ErrorMessage name="files" component="div" className="text-red italic" />
                      <div className="mt-10">
                        <FormLabel>{translate("answer", "attachFiles")}</FormLabel>
                        <div className="flex flex-col">
                          {!largeDevice ? (
                            <div className="flex flex-col px-12">
                              <ButtonFileUpload
                                name="files"
                                maxFileSize={maximumFileSize}
                                maxFileSizeText={translate("answer", "maximumFileSize")}
                                multiple
                                classes="mt-4"
                                onUploadFileError={onFileUploadError}
                                maxFileCountText={translate("answer", "maximumFileCount")}
                                maxFileCount={maximumFileCount}
                                allowedFileTypesText={translate("answer", "allowedFileTypesText")}
                                allowedFileTypes={
                                  validationConfig.allowedMimes && Array.from(validationConfig.allowedMimes)
                                }
                              >
                                {translate("answer", "buttonFileUpload")}
                              </ButtonFileUpload>
                            </div>
                          ) : (
                            <DropFileUpload
                              dropText={translate("answer", "dropFileUploadDrop")}
                              name="files"
                              maxFileSize={maximumFileSize}
                              multiple
                              classes="mt-4 tablet:mt-6 desktop:mt-8"
                              maxFileSizeText={translate("answer", "maximumFileSize")}
                              onUploadFileError={onFileUploadError}
                              maxFileCountText={translate("answer", "maximumFileCount")}
                              maxFileCount={maximumFileCount}
                              allowedFileTypes={
                                validationConfig.allowedMimes && Array.from(validationConfig.allowedMimes)
                              }
                              allowedFileTypesText={translate("answer", "allowedFileTypesText")}
                            >
                              {translate("answer", "dropFileUpload")}
                            </DropFileUpload>
                          )}
                          {values.files
                            ? values.files.map((file: File, index) => {
                                return (
                                  <FileAtom
                                    classes={`${index === 0 ? "mt-8 tablet:mt-10" : ""}`}
                                    file={file}
                                    key={index}
                                    onDelete={(fileToDelete) => {
                                      const existingFiles = values.files.filter(
                                        (localFile) => localFile.name !== fileToDelete.name
                                      );
                                      setFieldValue("files", existingFiles, false);
                                    }}
                                  >
                                    {file.name}
                                  </FileAtom>
                                );
                              })
                            : null}
                        </div>
                      </div>
                      <div className="mt-10">
                        <FormLabel classes="mb-2 tablet:mb-4">
                          {translate("answer", "termsAndConditionsLabel")}
                        </FormLabel>
                        <Checkbox name="conditions" single>
                          <button
                            className="text-blue-center underline cursor-pointer"
                            onClick={() => {
                              setSeeCondtions(true);
                              window.scrollTo(0, 0);
                            }}
                          >
                            {translate("answer", "termsAndConditions")}
                          </button>
                        </Checkbox>
                      </div>
                    </FormControl>
                    <NavigationBar fixed={false} classes="mt-9 tablet:mt-12 mb-20">
                      <Button
                        outlineColor={submitCount > 0 && dirty && !isValid ? "red" : undefined}
                        disabled={!values.conditions || isSubmitting || showResponseLimitWarning}
                        variant="primary"
                        classes="grow"
                        type="submit"
                      >
                        {translate("answer", "postHearingAnswerButton")}
                      </Button>
                    </NavigationBar>
                  </Form>
                </>
              )
            }
          </Formik>
        </Container>
      </main>
      <div ref={scrollRef}></div>
    </div>
  );
};

export { AnswerHearing };
export type { AnswerHearingForm };

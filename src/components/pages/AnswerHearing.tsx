import * as React from "react";

import Head from "next/head";
import { Form, Formik } from "formik";

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
  submit: (values: AnswerHearingForm) => void;
};

const AnswerHearing = ({ hearing, termsAndCondtions, initialComment, submit }: AnswerHearingProps) => {
  const { translate, translateWithReplace } = useTranslation();
  const appContext = useAppConfigContext();
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const [imageError, setImageError] = React.useState(false);
  const [seeConditions, setSeeCondtions] = React.useState(false);

  const fallbackImage = imageError ? "/default-hearing-image.jpg" : hearing.image || "/default-hearing-image.jpg";

  const HeadlineComponent = largeDevice ? Headline : Title;

  const maximumFileSize = 100;

  const scrollRef = React.useRef(null);
  const scrollToPostHearingAnswerButton = () => scrollRef.current.scrollIntoView();

  const onFileUploadError = (files: File[]) => {
    fileUploadError(
      appContext,
      translate,
      files.map((file) => file.name)
    );
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
        <Container classes="tablet:max-w-tabletHearingContent desktop:max-w-desktopHearingContent">
          <Formik initialValues={initialComment} enableReinitialize onSubmit={(values) => submit(values)}>
            {({ values, setFieldValue }) =>
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
                  <div className="mt-10 tablet:mt-1 4 desktop:mt-16 mb-8 tablet:mb-20">
                    <Checkbox
                      name="conditions"
                      single
                      customOnChange={() => {
                        setSeeCondtions(false);
                        scrollToPostHearingAnswerButton();
                      }}
                    >
                      <button
                        className="text-blue-center underline cursor-pointer"
                        onClick={() => {
                          setSeeCondtions(false);
                          setFieldValue("conditions", true, false);
                          scrollToPostHearingAnswerButton();
                        }}
                      >
                        {translate("answer", "termsAndConditionsAccept")}
                      </button>
                    </Checkbox>
                  </div>
                </>
              ) : (
                <>
                  <Summary fieldData={hearing.summaryField!} />
                  <Form className="mt-10">
                    <FormControl>
                      <FormLabel>{translate("answer", "hearingAnswer")}</FormLabel>
                      <div className="mt-2">
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
                      <Textarea
                        name="hearingAnswer"
                        placeholder={translate("answer", "writeHearingAnswerPlaceholder")}
                        classes="mt-4"
                      >
                        {translate("answer", "hearingAnswerLabel")}
                      </Textarea>
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
                      <Button disabled={!values.conditions} variant="primary" classes="flex-grow" type="submit">
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

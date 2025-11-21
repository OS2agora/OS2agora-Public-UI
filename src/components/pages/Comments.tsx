import * as React from "react";

import Head from "next/head";

import { Container } from "../atoms/Container";
import { TitleBar } from "../molecules/TitleBar";
import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Hearingbar } from "../molecules/Hearingbar";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";
import { canCommentOnHearing, HearingComment, HearingDetails } from "../../utilities/apiHelper";
import { useTranslation } from "../../hooks/useTranslation";
import { Summary } from "../renderHearing/fields";
import { NavigationBar } from "../atoms/NavigationBar";
import { Button } from "../atoms/Button";
import { HearingAnswer } from "../molecules/HearingAnswer";
import { SubHeader } from "../atoms/SubHeader";
import { HEARINGSTATUS_ACTIVE } from "../../utilities/constants/api";
import { ImageRenderer } from "../atoms/ImageRenderer";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import { useImages } from "../../hooks/useImages";
import { PaginationProps } from "../../hooks/usePagination";
import { Pagination } from "../molecules/Pagination";
import { readEnvironmentVariable } from "../../utilities/environmentHelper";
import { ENV_VARIABLE } from "../../utilities/constants/environmentVariables";

type CommentsProps = {
  hearing: HearingDetails;
  hearingComments: HearingComment[];
  routeToHearingPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  routeToLoginAndThenAnswerPage?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  deleteComment: (comment: HearingComment) => void;
  editComment: (comment: HearingComment) => void;
  pagination: PaginationProps;
  showResponseLimitWarning: boolean;
};

const Comments = ({
  hearing,
  hearingComments,
  routeToHearingPage,
  routeToAnswerPage,
  routeToLoginAndThenAnswerPage,
  deleteComment,
  editComment,
  pagination,
  showResponseLimitWarning,
}: CommentsProps) => {
  const { translate, translateWithReplace } = useTranslation();
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const images = useImages();
  const [imageError, setImageError] = React.useState(false);
  const isAuthorized = useIsAuthorized();

  const hideResponderInfo = readEnvironmentVariable(ENV_VARIABLE.HIDE_RESPONDER_INFO) === "true";

  const fallbackImage = imageError ? images?.fallbackImage : hearing.image || images?.fallbackImage;

  const canEditComment = canCommentOnHearing(hearing.hearingStatus);

  const HeadlineComponent = largeDevice ? Headline : Title;

  const clampCommentDate = (commentDateString: string): string => {
    try {
      const [commentDay, commentMonth, commentyear] = commentDateString.match(/\d{2,4}/g)!;
      const [hearingDay, hearingMonth, hearingyear] = hearing.deadline.match(/\d{2,4}/g)!;

      const commentDate = new Date(Number(commentyear), Number(commentMonth) - 1, Number(commentDay));
      const hearingDate = new Date(Number(hearingyear), Number(hearingMonth) - 1, Number(hearingDay));

      return commentDate < hearingDate ? commentDateString : hearing.deadline;
    } catch (error) {
      return commentDateString;
    }
  };

  return (
    <div className="flex-1">
      <Head>
        <title>{translateWithReplace("comments", "metaTitle", "##hearing##", hearing.title!)}</title>
        <meta
          name="Description"
          content={translateWithReplace("comments", "metaDescription", "##hearing##", hearing.title!)}
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
          <Summary fieldData={hearing.summaryField!} />

          <div className="mt-10">
            <HeadlineComponent type="heavy">{translate("comments", "hearingAnswer")}</HeadlineComponent>

            {hearingComments.length === 0 ? (
              <SubHeader classes="mt-2 tablet:mt-4">{translate("comments", "noHearingAnswers")}</SubHeader>
            ) : null}

            {hearing.shouldShowComments ? null : (
              <SubHeader classes="mt-2 tablet:mt-4">{translate("comments", "hiddenHearingAnswers")}</SubHeader>
            )}

            {hearingComments &&
              hearingComments.map((comment, index) => {
                return (
                  <HearingAnswer
                    key={comment.commentNumber}
                    classes={`${index === 0 ? "mt-8" : "mt-10"}`}
                    canEditComment={canEditComment}
                    onCommentEdit={() => editComment(comment)}
                    onCommentDelete={() => deleteComment(comment)}
                    commentNumber={comment.commentNumber}
                    date={clampCommentDate(comment.date)}
                    companyLabel={translate("comments", "companyLabel")}
                    responderInfo={comment.responderInfo}
                    missingAddressInformationLabel={translate("comments", "missingAddressInformationLabel")}
                    employeeLabel={translate("comments", "employeeLabel")}
                    citizenLabel={translate("comments", "citizenLabel")}
                    documents={comment.documents}
                    commentNumberLabel={translate("comments", "commentNumber")}
                    onBehalfOfLabel={translate("comments", "onBehalfOfLabel")}
                    onBehalfOf={comment.onBehalfOf}
                    editCommentTooltip={translate("comments", "editCommentTooltip")}
                    deleteCommentTooltip={translate("comments", "deleteCommentTooltip")}
                    hideResponderInfo={hideResponderInfo}
                  >
                    {comment.comment}
                  </HearingAnswer>
                );
              })}
            {pagination.enabled && hearingComments.length > 0 ? (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onChangePage={pagination.handleChangePage}
              />
            ) : null}
          </div>
          {showResponseLimitWarning && (
            <div className="mt-10">
              <SubHeader type="heavy" colorMode="error">
                {translate("comments", "responseLimitWarningText")}
              </SubHeader>
            </div>
          )}
          <NavigationBar fixed={false} classes="mt-9 tablet:mt-12 mb-20">
            <Button variant="primary" classes="grow" onClick={routeToHearingPage}>
              {translate("comments", "readHearingButton")}
            </Button>
            {hearing.hearingStatus === HEARINGSTATUS_ACTIVE ? (
              isAuthorized || (!isAuthorized && !routeToLoginAndThenAnswerPage) ? (
                <Button
                  variant="secondary"
                  classes="grow"
                  onClick={routeToAnswerPage}
                  disabled={showResponseLimitWarning}
                >
                  {translate("comments", "answerHearingButton")}
                </Button>
              ) : (
                <Button variant="secondary" classes="grow" onClick={routeToLoginAndThenAnswerPage}>
                  {translate("comments", "answerHearingAfterLoginButton")}
                </Button>
              )
            ) : null}
          </NavigationBar>
        </Container>
      </main>
    </div>
  );
};

export { Comments };

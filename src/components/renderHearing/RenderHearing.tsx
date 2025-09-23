import * as React from "react";

import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { HearingComment, HearingDetails } from "../../utilities/apiHelper";
import { Container } from "../atoms/Container";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";
import { TitleBar } from "../molecules/TitleBar";
import { Field } from "./Field";
import { Hearingbar } from "../molecules/Hearingbar";
import { HearingInformation } from "../molecules/HearingInformation";
import { HearingContactInformation } from "../molecules/HearingContactInformation";
import { NavigationBar } from "../atoms/NavigationBar";
import { Button } from "../atoms/Button";
import { useTranslation } from "../../hooks/useTranslation";
import { HEARINGSTATUS_ACTIVE } from "../../utilities/constants";
import { ImageRenderer } from "../atoms/ImageRenderer";
import useIsAuthorized from "../../hooks/useIsAuthorized";

type RenderHearingProps = {
  classes?: string;
  hearing: HearingDetails;
  comments: HearingComment[];
  routeToCommentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  routeToLoginAndThenAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const RenderHearing = ({
  classes,
  hearing,
  comments,
  routeToAnswerPage,
  routeToCommentPage,
  routeToLoginAndThenAnswerPage,
  ...rest
}: RenderHearingProps) => {
  const { translate } = useTranslation();
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const [imageError, setImageError] = React.useState(false);
  const isAuthorized = useIsAuthorized();

  const fieldsToRender = hearing.fields;

  const hearingFields = fieldsToRender
    .sort((a, b) => a.displayorder - b.displayorder)
    .map((field) => {
      return <Field fieldData={field} key={field.id} {...rest} />;
    });

  const fallbackImage = imageError ? "/default-hearing-image.jpg" : hearing.image || "/default-hearing-image.jpg";

  const HeadlineComponent = largeDevice ? Headline : Title;

  const showComments = hearing.shouldShowComments;
  const showCommentsButton = showComments || !!comments.length;

  return (
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
        {hearingFields}
        <div className="mt-10">
          <HeadlineComponent type="heavy">{translate("hearing", "generalInformation")}</HeadlineComponent>
          <HearingInformation
            classes="mt-4 tablet:mt-8"
            subjectAreaTitle={translate("hearing", "subjectArea")}
            subjectArea={hearing.subjectArea}
            statusTitle={translate("hearing", "status")}
            statusText={hearing.statusText}
            status={hearing.status}
            caseNumberTitle={translate("hearing", "caseNumber")}
            caseNumber={hearing.caseNumber}
          />
        </div>
        <div className="mt-10">
          <HeadlineComponent type="heavy">{translate("hearing", "contactInformation")}</HeadlineComponent>
          <HearingContactInformation
            classes="mt-4 tablet:mt-8"
            departmentTitle={translate("hearing", "department")}
            department={hearing.departmentName}
            contactpersonTitle={translate("hearing", "contactPerson")}
            contactPerson={hearing.contactPersonName}
            emailTitle={translate("hearing", "email")}
            email={hearing.contactPersonEmail}
            phoneNumberTitle={translate("hearing", "phoneNumber")}
            phoneNumber={hearing.contactPersonPhoneNumber}
          />
        </div>
        <NavigationBar fixed={false} classes="mt-9 tablet:mt-12 mb-mobileButtonsToFooter tablet:mb-20">
          {showCommentsButton && (
            <Button variant="primary" classes="flex-grow" onClick={routeToCommentPage}>
              {translate("hearing", "seeHearingAnswersButton")}
            </Button>
          )}
          {hearing.hearingStatus === HEARINGSTATUS_ACTIVE ? (
            isAuthorized || (!isAuthorized && !routeToLoginAndThenAnswerPage) ? (
              <Button variant="secondary" classes="flex-grow" onClick={routeToAnswerPage}>
                {translate("hearing", "answerHearingButton")}
              </Button>
            ) : (
              <Button variant="secondary" classes="flex-grow" onClick={routeToLoginAndThenAnswerPage}>
                {translate("hearing", "answerHearingAfterLoginButton")}
              </Button>
            )
          ) : null}
        </NavigationBar>
      </Container>
    </main>
  );
};

export { RenderHearing };

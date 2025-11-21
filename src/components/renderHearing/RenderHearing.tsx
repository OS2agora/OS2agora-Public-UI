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
import { HEARINGSTATUS_ACTIVE } from "../../utilities/constants/api";
import { ImageRenderer } from "../atoms/ImageRenderer";
import useIsAuthorized from "../../hooks/useIsAuthorized";
import { useImages } from "../../hooks/useImages";
import { validateLink } from "../../utilities/linkHelper";
import { SubHeader } from "../atoms/SubHeader";
import { readEnvironmentVariable } from "../../utilities/environmentHelper";
import { ENV_VARIABLE } from "../../utilities/constants/environmentVariables";
import clsx from "clsx";

type RenderHearingProps = {
  classes?: string;
  hearing: HearingDetails;
  comments: HearingComment[];
  showResponseLimitWarning: boolean;
  routeToCommentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, doLoginFlow: boolean): void;
};

const styles = {
  hearingImageRoot: "relative overflow-hidden tablet:mt-6",
  hearingImageNarrow: "tablet:h-80 desktop:h-128 w-full bg-cover",
  hearingImageNarrowBackround: "w-full bg-blue-dark pt-1 mt-4",
  hearingImageWide: "tablet:h-40 desktop:h-64 w-full",
};

const RenderHearing = ({
  classes,
  hearing,
  comments,
  showResponseLimitWarning,
  routeToAnswerPage,
  routeToCommentPage,
  ...rest
}: RenderHearingProps) => {
  const { translate } = useTranslation();
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const images = useImages();
  const [imageError, setImageError] = React.useState(false);
  const isAuthorized = useIsAuthorized();

  const showCaseNumber = readEnvironmentVariable(ENV_VARIABLE.SHOW_CASE_NUMBER) === "true";

  const fieldsToRender = hearing.fields;

  const hearingFields = fieldsToRender
    .sort((a, b) => a.displayorder - b.displayorder)
    .map((field) => {
      return <Field fieldData={field} key={field.id} {...rest} />;
    });

  const fallbackImage = imageError ? images?.fallbackImage : hearing.image || images?.fallbackImage;

  const HeadlineComponent = largeDevice ? Headline : Title;

  const showComments = hearing.shouldShowComments;
  const showCommentsButton = showComments || !!comments.length;

  const renderEmailAsLink = validateLink(hearing.contactPersonEmail);

  function renderHearingImage() {
    if (smallDevice) {
      return null;
    } else if (readEnvironmentVariable(ENV_VARIABLE.RENDER_NARROW_HEARING_IMAGE) === "true") {
      return (
        <div className={styles.hearingImageNarrowBackround}>
          <Container>
            <div
              className={clsx(styles.hearingImageRoot, styles.hearingImageNarrow)}
              style={{
                backgroundImage: `url(${hearing.image}), url(${images?.fallbackImage})`,
              }}
            ></div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className={clsx(styles.hearingImageRoot, styles.hearingImageWide)}>
          <ImageRenderer
            src={fallbackImage}
            onError={() => setImageError(true)}
            alt={hearing.imageAlt || "Billede"}
            aspectRatio={3.3}
          />
        </div>
      );
    }
  }

  return (
    <main className="mt-8 desktop:mt-12">
      <Container>
        <TitleBar title={hearing.title!} />
      </Container>
      {renderHearingImage()}
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
        {hearingFields}
        <div className="mt-10">
          <HeadlineComponent type="heavy">{translate("hearing", "generalInformation")}</HeadlineComponent>
          <HearingInformation
            classes="mt-4 tablet:mt-8"
            subjectAreaTitle={translate("hearing", "subjectArea")}
            subjectArea={hearing.subjectArea}
            cityAreaTitle={translate("hearing", "cityArea")}
            cityArea={hearing.cityArea}
            statusTitle={translate("hearing", "status")}
            statusText={hearing.statusText}
            status={hearing.status}
            caseNumberTitle={translate("hearing", "caseNumber")}
            caseNumber={hearing.caseNumber}
            showCaseNumber={showCaseNumber}
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
            renderEmailAsLink={renderEmailAsLink}
            emailLinkText={translate("hearing", "emailLinktext")}
          />
        </div>
        {showResponseLimitWarning && (
          <div className="mt-10">
            <SubHeader type="heavy" colorMode="error">
              {translate("hearing", "responseLimitWarningText")}
            </SubHeader>
          </div>
        )}
        <NavigationBar fixed={false} classes="mt-9 tablet:mt-12 mb-mobile-buttons-to-footer tablet:mb-20">
          {showCommentsButton && (
            <Button variant="primary" classes="grow" onClick={routeToCommentPage}>
              {translate("hearing", "seeHearingAnswersButton")}
            </Button>
          )}
          {hearing.hearingStatus === HEARINGSTATUS_ACTIVE ? (
            <Button
              variant="secondary"
              classes="grow"
              onClick={(e) => routeToAnswerPage(e, !isAuthorized)}
              disabled={showResponseLimitWarning}
            >
              {isAuthorized
                ? translate("hearing", "answerHearingButton")
                : translate("hearing", "answerHearingAfterLoginButton")}
            </Button>
          ) : null}
        </NavigationBar>
      </Container>
    </main>
  );
};

export { RenderHearing };

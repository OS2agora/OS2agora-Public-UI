import clsx from "clsx";
import { Container } from "../atoms/Container";
import { Small } from "../atoms/Small";
import { SubHeader } from "../atoms/SubHeader";

type HearingbarProps = {
  classes?: string;
  startDateTitle: string;
  starteDate: string;
  statusTitle: string;
  statusText: string;
  endDateTitle: string;
  endDate: string;
};

const styling = {
  root: "w-full bg-blue-dark h-16 desktop:h-18 text-white",
  container:
    "flex justify-between items-center h-full tablet:max-w-tabletHearingContent desktop:max-w-desktopHearingContent",
  textContainer: "flex items-center flex-col",
};

const Hearingbar = ({
  classes,
  startDateTitle,
  starteDate,
  statusTitle,
  statusText,
  endDateTitle,
  endDate,
  ...rest
}: HearingbarProps) => {
  const className = clsx(styling.root, classes);

  return (
    <div className={className} {...rest}>
      <Container classes={styling.container}>
        <div className={styling.textContainer}>
          <SubHeader type="medium">{startDateTitle}</SubHeader>
          <Small type="regular">{starteDate}</Small>
        </div>
        <div className={styling.textContainer}>
          <SubHeader type="medium">{statusTitle}</SubHeader>
          <Small type="regular">{statusText}</Small>
        </div>
        <div className={styling.textContainer}>
          <SubHeader type="medium">{endDateTitle}</SubHeader>
          <Small type="regular">{endDate}</Small>
        </div>
      </Container>
    </div>
  );
};

export { Hearingbar };

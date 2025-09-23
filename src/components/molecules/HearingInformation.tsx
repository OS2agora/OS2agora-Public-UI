import clsx from "clsx";
import { Body } from "../atoms/Body";
import { Caption } from "../atoms/Caption";
import { Card } from "../atoms/Card";
import { StatusIndicator } from "../atoms/StatusIndicator";

type HearingInformationProps = {
  classes?: string;
  subjectAreaTitle: string;
  subjectArea: string;
  statusTitle: string;
  statusText: string;
  status: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
  caseNumberTitle: string;
  caseNumber: string;
};

const styling = {
  root: "",
};

const HearingInformation = ({
  classes,
  subjectAreaTitle,
  subjectArea,
  statusTitle,
  status,
  statusText,
  caseNumberTitle,
  caseNumber,
  ...rest
}: HearingInformationProps) => {
  const className = clsx(styling.root, classes);

  return (
    <div className={className} {...rest}>
      <Card classes="bg-white flex justify-between p-4 mb-2 tablet:mb-4">
        <Body>{subjectAreaTitle}</Body>
        <Caption>{subjectArea}</Caption>
      </Card>
      <Card classes="bg-white flex justify-between p-4 mb-2 tablet:mb-4">
        <Body>{statusTitle}</Body>
        <StatusIndicator status={status}>{statusText}</StatusIndicator>
      </Card>
      <Card classes="bg-white flex justify-between p-4">
        <Body>{caseNumberTitle}</Body>
        <Caption>{caseNumber}</Caption>
      </Card>
    </div>
  );
};

export { HearingInformation };

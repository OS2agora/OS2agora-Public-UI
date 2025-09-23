import clsx from "clsx";
import { Body } from "../atoms/Body";
import { Caption } from "../atoms/Caption";
import { Card } from "../atoms/Card";

type HearingContactInformationProps = {
  classes?: string;
  departmentTitle: string;
  department: string;
  contactpersonTitle: string;
  contactPerson: string;
  emailTitle: string;
  email: string;
  phoneNumberTitle: string;
  phoneNumber: string;
};

const styling = {
  root: "bg-white flex flex-col p-4 space-y-5",
};

const HearingContactInformation = ({
  classes,
  departmentTitle,
  department,
  contactpersonTitle,
  contactPerson,
  emailTitle,
  email,
  phoneNumberTitle,
  phoneNumber,
  ...rest
}: HearingContactInformationProps) => {
  const className = clsx(styling.root, classes);

  return (
    <Card classes={className} {...rest}>
      <div className="flex justify-between">
        <div>
          <Body type="heavy">{departmentTitle}</Body>
          <Caption type="regular">{department}</Caption>
        </div>
        <div className="text-right">
          <Body type="heavy">{contactpersonTitle}</Body>
          <Caption type="regular">{contactPerson}</Caption>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <Body type="heavy">{emailTitle}</Body>
          <Caption type="regular">{email}</Caption>
        </div>
        <div className="text-right">
          <Body type="heavy">{phoneNumberTitle}</Body>
          <Caption type="regular">{phoneNumber}</Caption>
        </div>
      </div>
    </Card>
  );
};

export { HearingContactInformation };

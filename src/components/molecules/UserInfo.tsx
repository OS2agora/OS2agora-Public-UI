import React from "react";
import { Me } from "../../contexts/AppConfig";
import { Body } from "../atoms/Body";

const userInfoStyling = {
  userinfo: "mb-2 cursor-default",
  loggedInOnBehalfOf: "mr-1",
};

type UserInfoProps = {
  loggedInOnBehalfOfText: string;
  me: Me | undefined;
};

const UserInfo = ({ me, loggedInOnBehalfOfText }: UserInfoProps) => {
  const isCompany = me?.companyName !== undefined && me.companyName !== "";

  return (
    <div className={userInfoStyling.userinfo}>
      <Body type="heavy" component="p">
        {me?.displayName}
      </Body>
      {isCompany && (
        <>
          <Body type="heavy" component="span" classes={userInfoStyling.loggedInOnBehalfOf}>
            {loggedInOnBehalfOfText}
          </Body>
          <Body type="regular" component="span">
            {me.companyName}
          </Body>
        </>
      )}
    </div>
  );
};

export { UserInfo };

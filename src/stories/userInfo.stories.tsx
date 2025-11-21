import { text } from "@storybook/addon-knobs";
import { UserInfo as UserInfoMolecule } from "../components/molecules/UserInfo";
import React from "react";

export default {
  title: "Design System/Molecules/UserInfo",
};

const knobName = () => text("DisplayName", "Test Testesen", "UserInfo");
const knobLoggedInOnBehalfOfText = () => text("LoggedInOnBehalfOfText", "På vegne af:", "UserInfo");
const knobCompanyName = () => text("CompanyName", "Novataris", "UserInfo");

export const UserInfo = () => {
  const me = {
    displayName: knobName(),
    identifier: "",
    isAdministrator: false,
    isHearingCreator: false,
    companyName: knobCompanyName(),
  };

  return <UserInfoMolecule me={me} loggedInOnBehalfOfText={knobLoggedInOnBehalfOfText()} />;
};

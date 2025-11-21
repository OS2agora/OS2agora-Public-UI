import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { Header as HeaderMolecule } from "../components/molecules/Header";

export default {
  title: "Design System/Molecules/Header",
};

const knobTitle = () => text("Title", "Høringsportalen", "Header");
const knobPreTitle = () => text("Pre Title", "Novataris Kommune - ", "Header");
const knobLoginText = () => text("Login Text", "Log ind", "Header");
const knobLogoutText = () => text("Logout Text", "Log ud", "Header");
const knobMyHearingsText = () => text("My Hearings Text", "Mine høringer", "Header");
const knobLoginAsCitizenOrCompanyText = () => text("Login as Citizen or Company Text", "Log ind med MitId", "Header");
const knobLoginAsEmployeeText = () => text("Login as Employee text", "Log ind som medarbejder", "Header");
const knobLoggedInOnBehalfOfText = () => text("Logged in on behalf of text", "Logget ind som: ", "Header");

export const Header = () => (
  <HeaderMolecule
    image={{ src: "/images/novataris/mainLogo.png", alt: "Novataris Kommune Logo" }}
    title={knobTitle()}
    preTitle={knobPreTitle()}
    loginText={knobLoginText()}
    logoutText={knobLogoutText()}
    loginCitizenOrCompanyText={knobLoginAsCitizenOrCompanyText()}
    loginEmployeeText={knobLoginAsEmployeeText()}
    myHearingsText={knobMyHearingsText()}
    loggedOnBehalfOfText={knobLoggedInOnBehalfOfText()}
  ></HeaderMolecule>
);

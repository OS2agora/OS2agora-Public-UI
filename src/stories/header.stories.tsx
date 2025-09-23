import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { Header as HeaderMolecule } from "../components/molecules/Header";

export default {
  title: "Design System/Molecules/Header",
};

const knobTitle = () => text("Title", "Høringsportalen", "Header");
const knobPreTitle = () => text("Pre Title", "Ballerup Kommune - ", "Header");
const knobLoginText = () => text("Login Text", "Log ind", "Header");
const knobLogoutText = () => text("Logout Text", "Log ud", "Header");
const knobMyHearingsText = () => text("My Hearings Text", "Mine høringer", "Header");

export const Header = () => (
  <HeaderMolecule
    image={{ src: "/logo.svg", alt: "Ballerup Kommune Logo" }}
    title={knobTitle()}
    preTitle={knobPreTitle()}
    loginText={knobLoginText()}
    logoutText={knobLogoutText()}
    myHearingsText={knobMyHearingsText()}
  ></HeaderMolecule>
);

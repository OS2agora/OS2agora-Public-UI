import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { Layout as LayoutMolecule } from "../components/molecules/Layout";

export default {
  title: "Design System/Molecules/Layout",
};

const knobTitle = () => text("Title", "Høringsportalen", "Header");
const knobLoginText = () => text("Login Text", "Log ind", "Header");
const knobLogoutText = () => text("Logout Text", "Logud", "Header");
const knobMyHearingsText = () => text("My Hearings Text", "Mine høringer", "Header");
const knobPreText = () => text("Pre-Title Text", "Ballerup Kommune - ", "Header");

export const Layout = () => (
  <LayoutMolecule
    header={{
      image: { src: "/logo.svg", alt: "Ballerup Kommune Logo" },
      title: knobTitle(),
      loginText: knobLoginText(),
      logoutText: knobLogoutText(),
      myHearingsText: knobMyHearingsText(),
      preTitle: knobPreText(),
    }}
    footer={{
      image: { src: "/logo-white.png", alt: "Ballerup Kommune Logo" },
      textLines: ["BALLERUP", "KOMMUNE", "Hold-an Vej 7", "2750 Ballerup", "Tlf.: 4477 2000", "Fax: 4477 2730"],
      internalLinks: [
        { text: "Tilgængelighedserklæring", href: "/" },
        { text: "Databeskyttelse", href: "/" },
      ],
      externalLinks: [
        { text: "Om Kommunen", href: "/" },
        { text: "Kontakt", href: "/" },
      ],
    }}
  >
    Content goes here!
  </LayoutMolecule>
);

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
const knobPreText = () => text("Pre-Title Text", "Novataris Kommune - ", "Header");

export const Layout = () => (
  <LayoutMolecule
    header={{
      image: { src: "/logo.svg", alt: "Novataris Kommune Logo" },
      title: knobTitle(),
      loginText: knobLoginText(),
      logoutText: knobLogoutText(),
      myHearingsText: knobMyHearingsText(),
      preTitle: knobPreText(),
    }}
    footer={{
      image: { src: "/logo-white.png", alt: "Novataris Kommune Logo" },
      textLines: ["NOVATARIS", "KOMMUNE", "Nyhavn 43", "1051 København K", "Tlf.: 7027 8000", "Fax: 1234 5678"],
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

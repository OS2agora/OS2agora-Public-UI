import * as React from "react";
import { Footer as FooterMolecule } from "../components/molecules/Footer";

export default {
  title: "Design System/Molecules/Footer",
};

const textLines = ["BALLERUP", "KOMMUNE", "Hold-an vej 7", "2750 Ballerup", "Tlf.: 4477 2000", "Fax: 4477 2730"];
const internalLinks = [
  { text: "Tilgængelighedserklæring", href: "/" },
  { text: "Databeskyttelse", href: "/" },
];
const externalLinks = [
  { text: "Om Kommunen", href: "/" },
  { text: "Kontakt", href: "/" },
];
const image = { src: "/logo-white.png", alt: "Ballerup Kommune Logo" };

export const Footer = () => (
  <FooterMolecule
    textLines={textLines}
    externalLinks={externalLinks}
    internalLinks={internalLinks}
    image={image}
  ></FooterMolecule>
);

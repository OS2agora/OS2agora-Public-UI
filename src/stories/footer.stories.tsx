import * as React from "react";
import { Footer as FooterMolecule } from "../components/molecules/Footer";

export default {
  title: "Design System/Molecules/Footer",
};

const textLines = ["NOVATARIS", "KOMMUNE", "Nyhavn 43", "1051 København K", "Tlf.: 7027 8000", "Fax: 1234 5678"];
const internalLinks = [
  { text: "Tilgængelighedserklæring", href: "/" },
  { text: "Databeskyttelse", href: "/" },
];
const externalLinks = [
  { text: "Om Kommunen", href: "/" },
  { text: "Kontakt", href: "/" },
];
const image = { src: "/images/novataris/mainLogo.png", alt: "Novataris Kommune Logo" };

export const Footer = () => (
  <FooterMolecule
    textLines={textLines}
    externalLinks={externalLinks}
    internalLinks={internalLinks}
    image={image}
  ></FooterMolecule>
);

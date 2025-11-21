import * as React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { CookieBanner as CookieBannerMolecule } from "../components/molecules/CookieBanner";

export default {
  title: "Design System/Molecules/Cookie Banner",
};

const knobShow = () => boolean("Show", true, "CookieBanner");

export const CookieBanner = () => {
  return <CookieBannerMolecule show={knobShow()} onAccept={() => console.log("hello")} />;
};

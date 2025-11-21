import * as React from "react";
import { SubHeader as SubHeaderAtom } from "../components/atoms/SubHeader";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Subheader",
};

const knobText = () => text("Text", "Novataris Kommune", "SubHeader");

const knobTypeSelection = () => select("Type", ["heavy", "medium", "regular", "light"], "regular", "SubHeader");

const knobColorModeSelection = () => select("ColorMode", ["error", "default"], "default", "SubHeader");

export const Subheader = () => (
  <SubHeaderAtom type={knobTypeSelection()} colorMode={knobColorModeSelection()}>
    {knobText()}
  </SubHeaderAtom>
);

import * as React from "react";
import { SubHeader as SubHeaderAtom } from "../components/atoms/SubHeader";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Subheader",
};

const knobText = () => text("Text", "Ballerup Kommune", "SubHeader");

const knobTypeSelection = () => select("Type", ["heavy", "medium", "regular", "light"], "regular", "SubHeader");

export const Subheader = () => <SubHeaderAtom type={knobTypeSelection()}>{knobText()}</SubHeaderAtom>;

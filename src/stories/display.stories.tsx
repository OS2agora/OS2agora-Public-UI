import * as React from "react";
import { Display as DisplayAtom } from "../components/atoms/Display";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Display",
};

const knobText = () => text("Text", "Novataris Kommune", "Display");

const knobTypeSelection = () => select("Type", ["heavy", "light"], "heavy", "Display");

export const Display = () => <DisplayAtom type={knobTypeSelection()}>{knobText()}</DisplayAtom>;

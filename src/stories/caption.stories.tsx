import * as React from "react";
import { Caption as CaptionAtom } from "../components/atoms/Caption";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Caption",
};

const knobText = () => text("Text", "Novataris Kommune", "Caption");
const knobTypeSelection = () => select("Type", ["large", "heavy", "regular", "light"], "regular", "Caption");

export const Caption = () => <CaptionAtom type={knobTypeSelection()}>{knobText()}</CaptionAtom>;

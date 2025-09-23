import * as React from "react";
import { Small as SmallAtom } from "../components/atoms/Small";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Small",
};

const knobText = () => text("Text", "Ballerup Kommune", "Small");
const knobTypeSelection = () => select("Type", ["heavy", "regular", "light"], "regular", "Small");

export const Small = () => <SmallAtom type={knobTypeSelection()}>{knobText()}</SmallAtom>;

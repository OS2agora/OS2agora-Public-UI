import * as React from "react";
import { Button as ButtonAtom } from "../components/atoms/Button";
import { text, select, boolean } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Buttons/Button",
};

const knobText = () => text("Text", "Ballerup Kommune", "Button");
const knobVariantSelection = () => select("Variant", ["primary", "secondary"], "primary", "Button");
const knobDisabled = () => boolean("Disabled", false, "Button");

export const Button = () => (
  <ButtonAtom disabled={knobDisabled()} variant={knobVariantSelection()}>
    {knobText()}
  </ButtonAtom>
);

import * as React from "react";
import { TextButton as TextButtonAtom } from "../components/atoms/TextButton";
import { text, boolean } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Buttons/Text",
};

const knobText = () => text("Text", "Læs og besvar høring", "TextButton");
const knobDisabled = () => boolean("Disabled", false, "TextButton");

export const Text = () => <TextButtonAtom disabled={knobDisabled()}>{knobText()}</TextButtonAtom>;

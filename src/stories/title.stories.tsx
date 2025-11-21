import * as React from "react";
import { Title as TitleAtom } from "../components/atoms/Title";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Title",
};

const knobText = () => text("Text", "Novataris Kommune", "Title");
const knobTypeSelection = () => select("Type", ["heavy", "regular", "light"], "regular", "Title");

export const Title = () => <TitleAtom type={knobTypeSelection()}>{knobText()}</TitleAtom>;

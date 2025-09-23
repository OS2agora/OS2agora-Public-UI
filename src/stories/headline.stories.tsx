import * as React from "react";
import { Headline as HeadlineAtom } from "../components/atoms/Headline";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Headline",
};

const knobText = () => text("Text", "Ballerup Kommune", "Headline");
const knobTypeSelection = () => select("Type", ["heavy", "regular", "light"], "regular", "Headline");

export const Headline = () => <HeadlineAtom type={knobTypeSelection()}>{knobText()}</HeadlineAtom>;

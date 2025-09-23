import * as React from "react";
import { Body as BodyAtom } from "../components/atoms/Body";
import { text, select } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Typography/Body",
};

const knobText = () => text("Text", "Ballerup Kommune", "Body");
const knobTypeSelection = () => select("Type", ["heavy", "regular"], "heavy", "Body");

export const Body = () => <BodyAtom type={knobTypeSelection()}>{knobText()}</BodyAtom>;

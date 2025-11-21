import * as React from "react";
import { Link as LinkAtom } from "../components/atoms/Link";
import { boolean, text } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Link",
};

const knobText = () => text("Text", "Jeg er et link", "Link");
const knobUnderline = () => boolean("Underline", false, "Link");
export const Link = () => (
  <LinkAtom classes="text-grey-dark" underline={knobUnderline()}>
    {knobText()}
  </LinkAtom>
);

import * as React from "react";
import { Link as LinkAtom } from "../components/atoms/Link";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Design System/Atoms/Link",
};

const knobText = () => text("Text", "Jeg er et link", "Link");
export const Link = () => <LinkAtom classes="text-grey-dark">{knobText()}</LinkAtom>;

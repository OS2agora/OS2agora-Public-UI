import * as React from "react";
import { TitleBar as TitleBarMolecule } from "../components/molecules/TitleBar";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Design System/Molecules/Title Bar",
};

const knobTitle = () => text("Titel", "Aktuelle høringer", "TitleBar");

export const TitleBar = () => <TitleBarMolecule title={knobTitle()}></TitleBarMolecule>;

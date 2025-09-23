import * as React from "react";
import { text, select } from "@storybook/addon-knobs";
import { NavigationCard as NavigationCardMolecule } from "../components/molecules/NavigationCard";

import { FolderIcon, UserEditIcon, ArchiveIcon } from "../components/icons";

export default {
  title: "Design System/Molecules/Navigation Card",
};

const knobTitle = () => text("Title", "Aktuelle høringer", "NavigationCard");
const knobText = () => text("Text", "Læs og svar på de aktuelle høringer", "NavigationCard");
const knobColorSelection = () => select("Color", ["green", "blue", "lightblue"], "green", "NavigationCard");

export const NavigationCard = () => (
  <NavigationCardMolecule
    title={knobTitle()}
    text={knobText()}
    icon={<FolderIcon className="ml-1" />}
    color={knobColorSelection()}
  ></NavigationCardMolecule>
);

export const Collection = () => (
  <div className="bg-grey-light ">
    <NavigationCardMolecule
      title="Aktuelle høringer"
      text="Læs og svar på de aktuelle høringer"
      icon={<FolderIcon className="ml-1" />}
      color="green"
      classes="mb-4"
    ></NavigationCardMolecule>
    <NavigationCardMolecule
      title="Mine høringer"
      text="Se dine tidligere høringssvar"
      icon={<UserEditIcon className="ml-1" />}
      color="blue"
      classes="mb-4"
    ></NavigationCardMolecule>
    <NavigationCardMolecule
      title="Arkiveret høring"
      text="I arkivet kan afsluttede høringer genfindes"
      icon={<ArchiveIcon />}
      color="lightblue"
    ></NavigationCardMolecule>
  </div>
);

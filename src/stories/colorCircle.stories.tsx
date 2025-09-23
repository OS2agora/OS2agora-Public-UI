import * as React from "react";
import { select } from "@storybook/addon-knobs";
import { ColorCircle } from "../components/atoms/ColorCircle";

import { FolderIcon, UserEditIcon, ArchiveIcon } from "../components/icons";

export default {
  title: "Design System/Atoms/Color Circle",
};

const knobColorSelection = () => select("Color", ["green", "blue", "lightblue"], "green", "ColorCircle");

export const ColorCircleWithFolderIcon = () => <ColorCircle color={knobColorSelection()} icon={<FolderIcon />} />;

export const ColorCircleWithUserEditIcon = () => <ColorCircle color={knobColorSelection()} icon={<UserEditIcon />} />;

export const ColorCircleWithArchiveIcon = () => <ColorCircle color={knobColorSelection()} icon={<ArchiveIcon />} />;

import * as React from "react";
import { IconButton } from "../components/atoms/IconButton";
import { TimesIcon, TrashIcon } from "../components/icons";

export default {
  title: "Design System/Atoms/Buttons/Icon",
};

export const WithTimesIcon = () => <IconButton icon={<TimesIcon />}></IconButton>;
export const WithTrashIcon = () => <IconButton icon={<TrashIcon />}></IconButton>;

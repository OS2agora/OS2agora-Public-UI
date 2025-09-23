import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { UserCircle as UserCircleAtom } from "../components/atoms/UserCircle";

export default {
  title: "Design System/Atoms/User Circle",
};

const knobText = () => text("Initials", "MG", "UserCircle");

export const UserCircle = () => <UserCircleAtom initials={knobText()} onClick={() => console.log("Clicked")} />;

import * as React from "react";
import { text, select } from "@storybook/addon-knobs";
import { StatusIndicator as StatusIndicatorAtom } from "../components/atoms/StatusIndicator";

export default {
  title: "Design System/Atoms/Status Indicator",
};

const knobText = () => text("Text", "Ballerup Kommune", "StatusIndicator");
const knobStatusSelection = () =>
  select("Status", ["awaiting_startdate", "active", "awaiting_conclusion", "concluded"], "active", "StatusIndicator");

export const StatusIndicator = () => (
  <StatusIndicatorAtom status={knobStatusSelection()}>{knobText()}</StatusIndicatorAtom>
);

import * as React from "react";
import { text } from "@storybook/addon-knobs";

import { Hearingbar as HearingbarMolecule } from "../components/molecules/Hearingbar";

export default {
  title: "Design System/Molecules/Hearingbar",
};

const knobStartDateTitle = () => text("Start date title", "Startdato", "Hearingbar");
const knobStartDate = () => text("Start date", "01-12-2020", "Hearingbar");
const knobStatusTitle = () => text("Status title", "Status", "Hearingbar");
const knobStatusText = () => text("Status text", "I gang", "Hearingbar");
const knobEndDateTitle = () => text("End date title", "Svarfrist", "Hearingbar");
const knobEndDate = () => text("End date", "29-12-2020", "Hearingbar");

export const Hearingbar = () => (
  <HearingbarMolecule
    startDateTitle={knobStartDateTitle()}
    starteDate={knobStartDate()}
    statusTitle={knobStatusTitle()}
    statusText={knobStatusText()}
    endDateTitle={knobEndDateTitle()}
    endDate={knobEndDate()}
  />
);

import * as React from "react";
import { text, select } from "@storybook/addon-knobs";

import { HearingInformation as HearingInformationMolecule } from "../components/molecules/HearingInformation";

export default {
  title: "Design System/Molecules/Hearing Information",
};

const knobSubjectAreaTitle = () => text("Subject Area Title", "Fagområde:", "HearingInformation");
const knobSubjectArea = () => text("Subject Area", "BOLIG, VAND & VARME", "HearingInformation");
const knobStatusTitle = () => text("Status Title", "Status:", "HearingInformation");
const knobStatusText = () => text("Status Text", "I gang", "HearingInformation");
const knobStatusSelection = () =>
  select(
    "Status",
    ["awaiting_startdate", "active", "awaiting_conclusion", "concluded"],
    "active",
    "HearingInformation"
  );

const knobCaseNumberTitle = () => text("Case Number Title", "Sagsnummer:", "HearingInformation");
const knobCaseNumber = () => text("Case Number", "13.05.16-K04-77-20", "HearingInformation");

export const HearingInformation = () => (
  <HearingInformationMolecule
    subjectAreaTitle={knobSubjectAreaTitle()}
    subjectArea={knobSubjectArea()}
    statusTitle={knobStatusTitle()}
    statusText={knobStatusText()}
    status={knobStatusSelection()}
    caseNumberTitle={knobCaseNumberTitle()}
    caseNumber={knobCaseNumber()}
  />
);

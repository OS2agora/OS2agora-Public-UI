import * as React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { HearingCard as HearingCardMolecule } from "../components/molecules/HearingCard";

export default {
  title: "Design System/Molecules/Hearing Card",
};

const knobImage = () =>
  text(
    "Image",
    "https://images.unsplash.com/photo-1578836537282-3171d77f8632?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "HearingCard"
  );
const knobDateTitle = () => text("Date Title", "Svarfrist", "HearingCard");
const knobDateDate = () => text("Date", "01", "HearingCard");
const knobDateMonth = () => text("Month", "Maj", "HearingCard");
const knobComments = () => text("# Comments", "03", "HearingCard");
const knobTitle = () => text("Title", "Lukning af Parkskolen", "HearingCard");
const knobText = () =>
  text(
    "Text",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam malesuada eros a turpis bibendum, id pellentesque dui pharetra. Aenean sapien urna...",
    "HearingCard"
  );
const knobLinkText = () => text("Link Text", "Læs og besvar høring", "HearingCard");
const knobStatusText = () => text("Status Text", "I gang", "HearingCard");
const knobStatusSelection = () =>
  select("Status", ["awaiting_startdate", "active", "awaiting_conclusion", "concluded"], "active", "StatusIndicator");
const knobShouldShowComments = () => boolean("Show comments", true, "HearingCard");
const knobArchived = () => boolean("Archived", false, "HearingCard");

export const HearingCard = () => (
  <HearingCardMolecule
    image={knobImage()}
    date={{
      title: knobDateTitle(),
      date: knobDateDate(),
      month: knobDateMonth(),
    }}
    comments={knobComments()}
    title={knobTitle()}
    text={knobText()}
    linkText={knobLinkText()}
    status={knobStatusSelection()}
    statusText={knobStatusText()}
    onClick={() => console.log("Clicked")}
    shouldShowComments={knobShouldShowComments()}
    archived={knobArchived()}
  ></HearingCardMolecule>
);

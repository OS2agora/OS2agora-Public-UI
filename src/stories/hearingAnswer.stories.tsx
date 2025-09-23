import * as React from "react";
import { boolean, number, text } from "@storybook/addon-knobs";
import { HearingAnswer as HearingAnswerMolecule } from "../components/molecules/HearingAnswer";

export default {
  title: "Design System/Molecules/Hearing Answer",
};

const knobText = () =>
  text(
    "Text",
    "Dette er et svar på en høring consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nec dui nunc mattis enim. Vulputate dignissim suspendisse in est ante in nibh mauris. Semper auctor neque vitae tempus quam pellentesque nec nam aliquam. Nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Dette er et svar på en høring consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "HearingAnswer"
  );
const knobCommentNumber = () => number("Comment Number", 123);
const knobCommentNumberLabel = () => text("Comment Number Label", "Svarnummer:", "HearingAnswer");
const knobDate = () => text("Date", "01-12-2020", "HearingAnswer");
const knobIsOwner = () => boolean("Owner", false, "HearingAnswer");
const knobCanEdit = () => boolean("Can Edit", false, "HearingAnswer");
const knobOnBehalfOfLabel = () => text("On behalf of  label", "På vegne af:", "HearingAnswer");
const knobOnBehalfOf = () => text("On behalf of", "Bestyrelsen", "HearingAnswer");

export const HearingAnswer = () => (
  <HearingAnswerMolecule
    commentNumber={knobCommentNumber()}
    commentNumberLabel={knobCommentNumberLabel()}
    date={knobDate()}
    documents={[
      {
        fileContentType: ".pdf",
        fileName: "Høringssvar_foreningen_x.pdf",
        filePath: "c:/Høringssvar_foreningen_x.pdf",
        urlToDownload: "https://google.com",
      },
      {
        fileContentType: ".pdf",
        fileName: "Høringssvar_foreningen_x.docx",
        filePath: "c:/Høringssvar_foreningen_x.docx",
        urlToDownload: "https://google.com",
      },
      {
        fileContentType: ".pdf",
        fileName: "Høringssvar_foreningen_x.pdf",
        filePath: "c:/Høringssvar_foreningen_x.pdf",
        urlToDownload: "https://google.com",
      },
      {
        fileContentType: ".pdf",
        fileName: "Høringssvar_foreningen_x.pdf",
        filePath: "c:/Høringssvar_foreningen_x.pdf",
        urlToDownload: "https://google.com",
      },
    ]}
    isOwner={knobIsOwner()}
    onCommentDelete={() => console.log("Comment delete")}
    onCommentEdit={() => console.log("Comment edit")}
    canEditComment={knobCanEdit()}
    onBehalfOfLabel={knobOnBehalfOfLabel()}
    onBehalfOf={knobOnBehalfOf()}
  >
    {knobText()}
  </HearingAnswerMolecule>
);

export const HearingAnswerNoDocuments = () => (
  <HearingAnswerMolecule
    commentNumber={knobCommentNumber()}
    commentNumberLabel={knobCommentNumberLabel()}
    date={knobDate()}
    isOwner={knobIsOwner()}
    onCommentDelete={() => console.log("Comment delete")}
    onCommentEdit={() => console.log("Comment edit")}
    canEditComment={knobCanEdit()}
    onBehalfOfLabel={knobOnBehalfOfLabel()}
    onBehalfOf={knobOnBehalfOf()}
  >
    {knobText()}
  </HearingAnswerMolecule>
);

import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { Document as DocumentAtom } from "../components/atoms/Document";

export default {
  title: "Design System/Atoms/Document",
};

const knobFileName = () => text("File name", "Besparelser_lukning_af_parkskolen.pdf", "Document");

export const Document = () => (
  <DocumentAtom
    file={{
      fileName: knobFileName(),
      fileContentType: "application/json",
      filePath: "c:/filepath.pdf",
      urlToDownload: "www.google.com",
    }}
  />
);

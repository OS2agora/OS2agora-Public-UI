import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { File as FileAtom } from "../components/atoms/File";

export default {
  title: "Design System/Atoms/File",
};

const knobFileName = () => text("File name", "Besparelser_lukning_af_parkskolen.pdf", "File");

function onClick() {
  console.log("Clicked");
}

function onDelete() {
  console.log("Deleted");
}

export const SingleFile = () => (
  <FileAtom onDelete={onDelete} file={new File(["foo"], "foo.txt", { type: "text/plain" })}>
    {knobFileName()}
  </FileAtom>
);

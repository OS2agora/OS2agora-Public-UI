import * as React from "react";
import { TitleBarWithSearch as TitleBarWithSearchMolecule } from "../components/molecules/TitleBarWithSearch";
import { text } from "@storybook/addon-knobs";

export default {
  title: "Design System/Molecules/Title Bar With Search",
};

const knobTitle = () => text("Titel", "Aktuelle høringer", "TitleBarWithSearch");
const knobFilter = () => text("Filter", "Filtrer", "TitleBarWithSearch");
const knobInitialValue = () => text("Initial Value", "", "TitleBarWithSearch");
const knobLabel = () => text("Label", "Søg", "TitleBarWithSearch");

export const TitleBarWithSearch = () => (
  <TitleBarWithSearchMolecule
    initialValue={knobInitialValue()}
    title={knobTitle()}
    filter={knobFilter()}
    onClick={() => console.log("Clicked")}
    onSearch={(values) => console.log(values.search)}
    placeholder="Søg"
    label={knobLabel()}
  ></TitleBarWithSearchMolecule>
);

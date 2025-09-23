import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { GlobalMessage as GlobalMessageMolecule } from "../components/molecules/GlobalMessage";
import { Button } from "../components/atoms/Button";
import { useAppConfigContext } from "../hooks/useAppConfig";

export default {
  title: "Design System/Molecules/Global Message",
};

const knobTitle = () => text("Title", "Høringssvar modtaget", "GlobalMessage");
const knobText = () => text("Text", "Dit høringssvar er modtaget, og vil blive behandlet.", "GlobalMessage");
const knobButtonText = () => text("ButtonText", "Forstået", "GlobalMessage");

export const GlobalMessage = () => {
  const appContext = useAppConfigContext();

  function handleClick() {
    appContext!.setGlobalMessage({
      title: knobTitle(),
      text: knobText(),
      buttonText: knobButtonText(),
      show: true,
      onDismiss: () => console.log("Dismissed"),
    });
  }

  return (
    <>
      <Button onClick={handleClick}>Aktiver</Button>
      <GlobalMessageMolecule />
    </>
  );
};

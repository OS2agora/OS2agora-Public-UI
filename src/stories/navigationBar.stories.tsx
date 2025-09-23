import * as React from "react";
import { boolean } from "@storybook/addon-knobs";
import { NavigationBar as NavigationBarAtom } from "../components/atoms/NavigationBar";

import { Button } from "../components/atoms/Button";

export default {
  title: "Design System/Atoms/Navigation Bar",
};

const knobFixed = () => boolean("Fixed", true, "NavigationBar");

export const NavigationBar = () => (
  <div className="h-screen bg-grey-light">
    <NavigationBarAtom fixed={knobFixed()}>
      <Button>Anvend filtrer</Button>
    </NavigationBarAtom>
  </div>
);

export const MultipleButtons = () => (
  <div className="h-screen bg-grey-light">
    <NavigationBarAtom fixed={knobFixed()}>
      <Button classes="flex-grow">Se høringssvar</Button>
      <Button variant="secondary" classes="flex-grow">
        Afgiv høringssvar
      </Button>
    </NavigationBarAtom>
  </div>
);

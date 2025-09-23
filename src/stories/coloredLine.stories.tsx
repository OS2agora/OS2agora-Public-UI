import * as React from "react";
import { select } from "@storybook/addon-knobs";
import { ColoredLine as ColoredLineAtom } from "../components/atoms/ColoredLine";
import { Headline } from "../components/atoms/Headline";
import { Card } from "../components/atoms/Card";

export default {
  title: "Design System/Atoms/Colored Line",
};

const knobSizeSelection = () => select("Size", ["small", "large"], "small", "ColoredLine");
const knobPositionSelection = () => select("Position", ["left", "center", "right"], "left", "ColoredLine");

export const ColoredLine = () => <ColoredLineAtom size={knobSizeSelection()} position={knobPositionSelection()} />;

export const WithText = () => {
  return (
    <Card classes="py-4 px-8 bg-white">
      <Headline>Aktuelle høringer</Headline>
      <ColoredLineAtom size={knobSizeSelection()} position={knobPositionSelection()} />
    </Card>
  );
};

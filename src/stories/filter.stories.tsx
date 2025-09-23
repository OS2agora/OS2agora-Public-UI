import * as React from "react";
import { text } from "@storybook/addon-knobs";
import { Filter as FilterMolecule } from "../components/molecules/Filter";
import { Button } from "../components/atoms/Button";

export default {
  title: "Design System/Molecules/Filter",
};

const knobHearingType = () => text("Valgt Høringstype", "Active", "Filter");

function onSubmit(values: any, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
  console.log(values);
  setIsOpen(false);
}

export const Filter = () => {
  const [open, setIsOpen] = React.useState(false);
  return (
    <>
      <p>Content than span the page</p>
      <Button onClick={() => setIsOpen(!open)}>{open ? "Close" : "Open"}</Button>
      <FilterMolecule
        open={open}
        onSubmit={(values) => onSubmit(values, setIsOpen)}
        initialRadioButtonOption={knobHearingType()}
        radioButtonOptions={[
          {
            value: "Active",
            text: "Aktive høringer",
          },
          {
            value: "Mine",
            text: "Mine høringer",
          },
          {
            value: "Archived",
            text: "Arkiveret høringer",
          },
        ]}
        checkboxOptions={[
          {
            value: "SkoleOgUngdom",
            text: "Skole og Ungdom",
          },
          {
            value: "Lokalplan",
            text: "Lokalplan",
          },
          {
            value: "Politik",
            text: "Politik",
          },
        ]}
        texts={{
          checkboxLabel: "Fagområder",
          radioButtonLabel: "Høringstype",
          submitText: "Anvend filtrer",
          title: "Filtrer",
        }}
      />
    </>
  );
};

import * as React from "react";
import { Slider as SliderAtom } from "../components/atoms/Slider";
import { Button } from "../components/atoms/Button";

export default {
  title: "Design System/Atoms/Slider",
};

export const Slider = () => {
  const [open, setIsOpen] = React.useState(false);
  return (
    <>
      <p>Content than span the page</p>
      <Button onClick={() => setIsOpen(!open)}>{open ? "Close" : "Open"}</Button>
      <SliderAtom open={open}>Hej</SliderAtom>
    </>
  );
};

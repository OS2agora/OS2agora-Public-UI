import * as React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { Input as InputAtom } from "../components/atoms/Input";
import { Textarea as TextareaAtom } from "../components/atoms/Textarea";
import { Form, Formik } from "formik";
import { FormControl } from "../components/atoms/FormControl";

export default {
  title: "Design System/Atoms/Input",
};

const knobPlaceholder = () => text("Placeholder", "Skriv høringssvar...", "TextField");
const knobText = () => text("Text", "Skriv høringssvar...", "TextField");
const knobError = () => boolean("Error", false, "TextField");

export const Input = () => (
  <Formik
    initialValues={{
      text: "",
    }}
    onSubmit={() => console.log("submitted")}
  >
    {({ values }) => (
      <Form>
        <FormControl>
          <InputAtom error={knobError()} placeholder={knobPlaceholder()} name="text">
            {knobText()}
          </InputAtom>
          <div>Wrote: {values.text}</div>
        </FormControl>
      </Form>
    )}
  </Formik>
);

export const Textarea = () => (
  <Formik
    initialValues={{
      text: "",
    }}
    onSubmit={() => console.log("submitted")}
  >
    {({ values }) => (
      <Form>
        <FormControl>
          <TextareaAtom error={knobError()} placeholder={knobPlaceholder()} name="text">
            {knobText()}
          </TextareaAtom>
          <div>Wrote: {values.text}</div>
        </FormControl>
      </Form>
    )}
  </Formik>
);

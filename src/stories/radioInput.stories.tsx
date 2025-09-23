import * as React from "react";
import { Form, Formik } from "formik";
import { RadioButton } from "../components/atoms/RadioButton";
import { FormControl } from "../components/atoms/FormControl";
import { FormLabel } from "../components/atoms/FormLabel";

export default {
  title: "Design System/Atoms/Input/Radio",
};

export const Radio = () => {
  return (
    <Formik
      initialValues={{
        color: "",
      }}
      onSubmit={() => console.log("Submitted")}
    >
      {({ values }) => (
        <Form>
          <FormControl>
            <FormLabel>Pick a Color</FormLabel>
            <RadioButton name="color" value="Red">
              Red
            </RadioButton>
            <RadioButton name="color" value="Blue">
              Blue
            </RadioButton>
            <RadioButton name="color" value="Green">
              Green
            </RadioButton>
          </FormControl>
          <div>Picked: {values.color}</div>
        </Form>
      )}
    </Formik>
  );
};

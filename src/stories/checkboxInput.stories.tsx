import * as React from "react";
import { Form, Formik, FormikErrors } from "formik";
import { Checkbox } from "../components/atoms/Checkbox";
import { FormControl } from "../components/atoms/FormControl";
import { FormLabel } from "../components/atoms/FormLabel";

export default {
  title: "Design System/Atoms/Input/Checkbox",
};

export const MultipleChoise = () => {
  return (
    <Formik
      initialValues={{
        colors: [],
      }}
      onSubmit={() => console.log("submitted")}
    >
      {({ values }) => (
        <Form>
          <FormControl>
            <FormLabel>Pick some Colors</FormLabel>
            <Checkbox name="colors" value="Red">
              Red
            </Checkbox>
            <Checkbox name="colors" value="Blue">
              Blue
            </Checkbox>
            <Checkbox name="colors" value="Green">
              Green
            </Checkbox>
          </FormControl>
          <div>Picked: {values.colors}</div>
        </Form>
      )}
    </Formik>
  );
};

export const Boolean = () => {
  return (
    <Formik
      initialValues={{
        accepted: false,
      }}
      onSubmit={() => console.log("submitted")}
    >
      {({ values }) => (
        <Form>
          <FormControl>
            <FormLabel>Accept the terms?</FormLabel>
            <Checkbox name="accepted" single>
              Accept
            </Checkbox>
          </FormControl>
          <div>You chose to: {values.accepted ? "Accept" : "Decline"}</div>
        </Form>
      )}
    </Formik>
  );
};

type FormValues = {
  accepted?: boolean;
};

const validate = (values: FormValues) => {
  const errors: FormikErrors<FormValues> = {};

  if (!values.accepted) {
    errors.accepted = "Cannot be declined!";
  }

  return errors;
};

export const WithValidation = () => {
  return (
    <Formik
      initialValues={{
        accepted: false,
      }}
      onSubmit={() => console.log("submitted")}
      validate={validate}
    >
      {({ values }) => (
        <Form>
          <FormControl>
            <FormLabel>Accept the terms?</FormLabel>
            <Checkbox name="accepted" single>
              Accept
            </Checkbox>
          </FormControl>
          <div>You chose to: {values.accepted ? "Accept" : "Decline"}</div>
        </Form>
      )}
    </Formik>
  );
};

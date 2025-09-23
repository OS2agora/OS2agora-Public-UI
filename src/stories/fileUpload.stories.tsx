import * as React from "react";
import { Form, Formik } from "formik";
import { DropFileUpload as DropFileUploadMolecule } from "../components/molecules/DropFileUpload";
import { ButtonFileUpload as ButtonFileUploadMolecule } from "../components/molecules/ButtonFileUpload";
import { FormControl } from "../components/atoms/FormControl";
import { FormLabel } from "../components/atoms/FormLabel";

import { Button } from "../components/atoms/Button";

export default {
  title: "Design System/Molecules/File Upload",
};

export const DropFileUpload = () => (
  <Formik
    initialValues={{
      files: [],
    }}
    onSubmit={(event) => console.log(event)}
  >
    {({ values }) => (
      <Form className="flex flex-col">
        <FormControl>
          <FormLabel classes="pb-5">Vedhæft fil</FormLabel>
          <DropFileUploadMolecule dropText="Slip filerne for at uploade" name="files" multiple classes="mb-5">
            Klik eller træk for at uploade filer
          </DropFileUploadMolecule>
        </FormControl>
        {values.files.map((file: File) => {
          return (
            <>
              <div>File name: {file.name}</div>
              <div>File size: {file.size}</div>
              <div>File type: {file.type}</div>
            </>
          );
        })}
        <Button type="submit" classes="mt-5">
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

export const ButtonFileUpload = () => (
  <Formik
    initialValues={{
      files: [],
    }}
    onSubmit={(event) => console.log(event)}
  >
    {({ values }) => (
      <Form className="w-64 flex flex-col">
        <FormControl>
          <FormLabel classes="pb-5">Vedhæft fil</FormLabel>
          <ButtonFileUploadMolecule name="files" multiple classes="mb-5">
            Klik for at uploade en fil
          </ButtonFileUploadMolecule>
        </FormControl>
        {values.files.map((file: File) => {
          return (
            <>
              <div>File name: {file.name}</div>
              <div>File size: {file.size}</div>
              <div>File type: {file.type}</div>
            </>
          );
        })}
        <Button type="submit" classes="mt-5">
          Submit
        </Button>
      </Form>
    )}
  </Formik>
);

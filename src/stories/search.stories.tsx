import * as React from "react";
import { Form, Formik } from "formik";
import { FormControl } from "../components/atoms/FormControl";
import { Search as SearchMolecule } from "../components/molecules/Search";

export default {
  title: "Design System/Molecules/Search",
};

function onSearch(values: { search: string }): void {
  console.log("Input changed to: " + values.search);
}

export const Search = () => (
  <Formik
    initialValues={{
      search: "",
    }}
    onSubmit={onSearch}
  >
    {() => (
      <Form>
        <FormControl>
          <SearchMolecule name="search" placeholder="Søg" classes="bg-grey-light p-10"></SearchMolecule>
        </FormControl>
      </Form>
    )}
  </Formik>
);

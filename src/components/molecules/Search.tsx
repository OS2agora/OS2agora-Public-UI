import clsx from "clsx";
import React from "react";
import { FieldHookConfig, useField } from "formik";

import { LoupeIcon } from "../icons";

type SearchProps = FieldHookConfig<string> & {
  classes?: string;
  placeholder: string;
};

const styling = {
  root: "text-grey-dark",
  container: "bg-white rounded-sm flex items-center px-4 py-3",
  input:
    "pl-2 outline-hidden w-full text-black placeholder-grey-dark font-Lato text-sm leading-5 focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
  button: "focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
};

const Search = ({ classes, placeholder, ...rest }: SearchProps) => {
  const [field] = useField({ ...rest });
  const className = clsx(styling.root, classes);

  return (
    <div className={className}>
      <div className={styling.container}>
        <button type="submit" className={styling.button}>
          <LoupeIcon aria-label={placeholder} />
        </button>
        <label htmlFor={placeholder} className="sr-only">
          {placeholder}
        </label>
        <input
          type="text"
          title="Søg på høringstitlen"
          {...field}
          className={styling.input}
          placeholder={placeholder}
          id={placeholder}
        />
      </div>
    </div>
  );
};

export { Search };

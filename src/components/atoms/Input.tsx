import * as React from "react";
import clsx from "clsx";

import { ExclamationCircleIcon } from "../icons";
import { FieldHookConfig, useField } from "formik";

type InputProps = FieldHookConfig<string> & {
  classes?: string;
  error?: boolean;
  placeholder: string;
  children: React.ReactNode;
};

const styling = {
  container: "relative resize-none",
  root: "bg-grey-textField border-2 p-4 border-blue-grey w-full",
  placeholder: "placeholder-grey-dark font-Lato text-sm leading-5",
  error: "bg-grey-textField border p-4 border-red w-full",
  errorIcon: "absolute right-4 top-4 text-red",
  input: "h-14",
  label: "sr-only",
};

const Input = ({ classes, error = false, placeholder, children, ...rest }: InputProps) => {
  const [field, _] = useField({ ...rest });

  const className = clsx(!error && styling.root, styling.placeholder, styling.input, error && styling.error, classes);

  return (
    <div className={styling.container}>
      <label className={styling.label} htmlFor={placeholder}>
        {children}
      </label>
      <input className={className} {...field} placeholder={placeholder} type="text" id={placeholder} />

      {error && <ExclamationCircleIcon className={styling.errorIcon} />}
    </div>
  );
};

export { Input };

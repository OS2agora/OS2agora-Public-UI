import * as React from "react";
import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";

import { SubHeader } from "./SubHeader";
import { CircleIcon, DotCircleIcon } from "../icons";

type RadioButtonProps = FieldHookConfig<string> & {
  classes?: string;
  children: React.ReactNode;
};

const styling = {
  root: "w-full",
  input: "sr-only",
  text: "pl-4 w-full",
  container: "flex items-center",
  icon: "text-2xl text-grey",
  checked: "text-2xl text-grey-dark",
  error: "text-red",
};

const RadioButton = ({ classes, children, ...rest }: RadioButtonProps) => {
  const [field, meta] = useField({ ...rest, type: "radio" });
  const className = clsx(styling.root, classes);

  return (
    <div className={className}>
      <label>
        <input className={styling.input} type="radio" {...field} />
        <span className={styling.container}>
          {field.checked ? (
            <DotCircleIcon className={styling.checked} aria-label={children} />
          ) : (
            <CircleIcon className={styling.icon} aria-label={children} />
          )}
          <SubHeader component="span" type="heavy" classes={styling.text}>
            {children}
          </SubHeader>
        </span>
      </label>

      {meta.touched && meta.error ? <div className={styling.error}>{meta.error}</div> : null}
    </div>
  );
};

export { RadioButton };

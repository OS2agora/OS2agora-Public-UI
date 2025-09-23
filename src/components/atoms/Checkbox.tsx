import * as React from "react";
import clsx from "clsx";
import { useField, FieldHookConfig } from "formik";

import { SubHeader } from "./SubHeader";
import { CheckSquareIcon, SquareIcon, CheckSquareFilledIcon } from "../icons";

type CheckboxProps = FieldHookConfig<string> & {
  classes?: string;
  children?: React.ReactNode;
  single?: boolean;
  customOnChange?: () => void;
};

const styling = {
  root: "pb-2",
  input: "sr-only",
  text: "pl-4 w-full",
  container: "flex items-center",
  icon: "text-2xl  text-grey",
  checked: "text-2xl   text-grey-dark",
  error: "",
};

const Checkbox = ({ classes, children, single = false, customOnChange, ...rest }: CheckboxProps) => {
  const [field, meta] = useField({ ...rest, type: "checkbox" });
  const className = clsx(styling.root, classes);

  const localOnChange = (e) => {
    field.onChange(e);

    if (customOnChange && typeof customOnChange === "function") {
      customOnChange();
    }
  };

  return (
    <div className={className}>
      <label>
        <input className={styling.input} type="checkbox" {...field} onChange={localOnChange} />
        <span className={styling.container}>
          {field.checked ? (
            single ? (
              <CheckSquareFilledIcon className={styling.checked} aria-label={children} />
            ) : (
              <CheckSquareIcon className={styling.checked} aria-label={children} />
            )
          ) : (
            <SquareIcon className={styling.icon} aria-label={children} />
          )}
          {children && (
            <SubHeader component="span" classes={styling.text}>
              {children}
            </SubHeader>
          )}
        </span>
      </label>

      {meta.touched && meta.error ? <div className={styling.error}>{meta.error}</div> : null}
    </div>
  );
};

export { Checkbox };

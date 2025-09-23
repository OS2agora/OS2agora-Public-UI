import * as React from "react";
import clsx from "clsx";

import { Caption } from "./Caption";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  classes?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

const styling = {
  root: "py-3 px-10 rounded focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent",
  variants: {
    primary: "bg-blue-center text-white",
    secondary: "bg-white text-blue-center border border-blue-center",
  },
  disabled: "bg-grey-light text-grey border border-grey pointer-events-none",
  hover: {
    primary: "hover:bg-blue-grey hover:text-white",
    secondary: "hover:text-blue-grey hover:border-blue-grey",
  },
  active: {
    primary: "active:bg-blue-centerClick active:text-white",
    secondary: "active:text-blue-centerClick active:border-blue-centerClick",
  },
  text: "block",
};

const Button = ({
  classes,
  children,
  variant = "primary",
  disabled = false,
  type = "button",
  ...rest
}: ButtonProps) => {
  const className = clsx(
    styling.root,
    disabled ? styling.disabled : styling.variants[variant],
    styling.hover[variant],
    styling.active[variant],
    classes
  );

  return (
    <button className={className} type={type} {...rest} disabled={disabled}>
      <Caption component="span" type="heavy" classes={styling.text}>
        {children}
      </Caption>
    </button>
  );
};

export { Button };

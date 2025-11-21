import * as React from "react";
import clsx from "clsx";

import { Caption } from "./Caption";

type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  classes?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  outlineColor?: "red";
};

const styling = {
  root: "py-3 px-10 rounded-sm",
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
    primary: "active:bg-blue-center-click active:text-white",
    secondary: "active:text-blue-center-click active:border-blue-center-click",
  },
  outlineColor: {
    default: "focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
    red: "ring-2 ring-red",
  },
  text: "block",
};

const Button = ({
  classes,
  children,
  outlineColor,
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
    classes,
    outlineColor ? styling.outlineColor[outlineColor] : styling.outlineColor.default
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

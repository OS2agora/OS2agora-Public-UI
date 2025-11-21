import * as React from "react";
import clsx from "clsx";

import { Caption } from "./Caption";

type PaginationButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  classes?: string;
  children: React.ReactNode;
  variant?: "arrow" | "page" | "activePage";
};

const styling = {
  root: "m-1 py-2 rounded-sm cursor-pointer focus:outline-hidden focus:ring-0 focus:border-none focus:box-shadow-none",
  variants: {
    activePage: "px-3 bg-blue-center text-white opacity-60",
    page: "px-3 bg-blue-center text-white",
    arrow: "px-1 text-blue-center",
  },
  disabled: "px-1 opacity-30 cursor-default pointer-events-none",
  hover: {
    activePage: "",
    page: "hover:bg-blue-grey hover:text-white",
    arrow: "hover:text-blue-grey",
  },
  active: {
    activePage: "",
    page: "",
    arrow: "",
  },
  text: "block text-base",
};

const PaginationButton = ({
  classes,
  children,
  variant = "page",
  disabled = false,
  type = "button",
  ...rest
}: PaginationButtonProps) => {
  const className = clsx(
    styling.root,
    disabled ? styling.disabled : styling.variants[variant],
    styling.hover[variant],
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

export { PaginationButton };

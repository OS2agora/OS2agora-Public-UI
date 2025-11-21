import clsx from "clsx";
import React from "react";

import { Caption } from "./Caption";
import { ChevronIcon } from "../icons/index";

type TextButtonProps = React.ComponentPropsWithRef<"button"> & {
  classes?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const styling = {
  root:
    "text-blue-center group focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
  disabled: "text-grey pointer-events-none",
  hover: "hover:text-blue-grey",
  active: "active:text-blue-center-click",
  icon: {
    root: "inline ml-2 text-xxs",
    hover: "transform duration-200 group-hover:ml-3.5",
  },
};

const TextButton = ({ classes, children, disabled = false, ...rest }: TextButtonProps) => {
  const className = clsx(
    styling.root,
    disabled && styling.disabled,
    !disabled && styling.hover,
    !disabled && styling.active,
    classes
  );

  const iconClassName = clsx(styling.icon.root, !disabled && styling.icon.hover);

  return (
    <button className={className} {...rest}>
      <Caption component="span" type="heavy">
        {children}
        <ChevronIcon className={iconClassName} aria-label={children} />
      </Caption>
    </button>
  );
};

export { TextButton };

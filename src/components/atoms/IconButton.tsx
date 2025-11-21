import clsx from "clsx";
import React from "react";

type IconButtonProps = React.ComponentPropsWithRef<"button"> & {
  classes?: string;
  icon: React.ReactNode;
};

const styling = {
  root:
    "h-8 w-8 bg-blue-center flex items-center justify-center text-white hover:bg-blue-center-click focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
};

const IconButton = ({ classes, icon, ...rest }: IconButtonProps) => {
  const className = clsx(styling.root, classes);
  return (
    <button className={className} {...rest}>
      {icon}
    </button>
  );
};

export { IconButton };

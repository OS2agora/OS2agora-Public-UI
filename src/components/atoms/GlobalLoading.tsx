import * as React from "react";
import clsx from "clsx";

import { SpinnerIcon } from "../icons";

type GlobalLoadingProps = {
  classes?: string;
};

const styling = {
  root: "w-full h-full bg-grey-light z-20 flex justify-center items-center opacity-80",
  icon: "animate-spin text-5xl",
};

const GlobalLoading = ({ classes, ...rest }: GlobalLoadingProps) => {
  const className = clsx(styling.root, classes);

  return (
    <div {...rest} className={className}>
      <SpinnerIcon className={styling.icon} />
    </div>
  );
};

export { GlobalLoading };

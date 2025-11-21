import clsx from "clsx";
import React, { MouseEvent } from "react";
import { SpinnerIcon } from "../icons";
import Backdrop from "../atoms/Backdrop";

type GlobalLoadingOverlayProps = {
  classes?: string;
  isLoading: boolean;
};

const styling = {
  root: "p-6 flex flex-col items-center w-full fixed z-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
  icon: "animate-spin text-5xl",
};

const strangleClicks = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

const GlobalLoadingOverlay = ({ classes, isLoading = false }: GlobalLoadingOverlayProps) => {
  const className = clsx(styling.root, classes);

  if (!isLoading) {
    return null;
  }

  return (
    <div aria-modal="true" role="dialog" aria-labelledby="Loading overlay">
      <Backdrop show={isLoading} onClick={strangleClicks} />
      <div className={className}>
        <SpinnerIcon className={styling.icon} />
      </div>
    </div>
  );
};

export { GlobalLoadingOverlay };

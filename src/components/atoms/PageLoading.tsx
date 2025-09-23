import * as React from "react";
import clsx from "clsx";

import { SpinnerIcon } from "../icons";
import { Title } from "./Title";
import { useTranslation } from "../../hooks/useTranslation";

type PageLoadingProps = {
  classes?: string;
};

const styling = {
  root: "w-full h-full bg-grey-light z-20 flex flex-col justify-center items-center opacity-80",
  icon: "animate-spin text-5xl mb-8",
};

const PageLoading = ({ classes, ...rest }: PageLoadingProps) => {
  const { translate } = useTranslation();
  const className = clsx(styling.root, classes);

  return (
    <div {...rest} className={className}>
      <SpinnerIcon className={styling.icon} />
      <Title>{translate("global", "pageLoadingText")}</Title>
    </div>
  );
};

export { PageLoading };

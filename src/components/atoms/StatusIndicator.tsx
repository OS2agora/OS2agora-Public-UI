import clsx from "clsx";
import React from "react";

import { Small } from "./Small";

type StatusIndicatorProps = {
  classes?: string;
  children: React.ReactNode;
  status?: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
};

const styling = {
  root: "inline-block",
  inner: "flex items-center h-6 px-2.5",

  awaiting_startdate: "bg-grey-dark/25 border border-grey-dark text-grey-dark",
  active: "bg-green-current-hearing/25 border border-green-current-hearing text-green-current-hearing",
  concluded: "bg-blue-my-hearings/25 border border-blue-my-hearings text-blue-my-hearings",
  awaiting_conclusion: "bg-grey-dark/25 border border-grey-dark text-grey-dark",
};

const StatusIndicator = ({ classes, children, status = "active", ...rest }: StatusIndicatorProps) => {
  const className = clsx(styling.root, classes);
  const innerClassName = clsx(styling.inner, styling[status]);

  return (
    <div {...rest} className={className}>
      <div className={innerClassName}>
        <Small type="heavy" component="span">
          {children}
        </Small>
      </div>
    </div>
  );
};

export { StatusIndicator };

import clsx from "clsx";

import { Small } from "./Small";

type StatusIndicatorProps = {
  classes?: string;
  children: React.ReactNode;
  status?: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
};

const styling = {
  root: "inline-block",
  inner: "flex items-center h-6 px-2.5",
  awaiting_startdate: "bg-grey-dark bg-opacity-25 border border-grey-dark text-grey-dark",
  active: "bg-green-currentHearing bg-opacity-25 border border-green-currentHearing text-green-currentHearing",
  concluded: "bg-blue-myHearings bg-opacity-25 border border-blue-myHearings text-blue-myHearings",
  awaiting_conclusion: "bg-grey-dark bg-opacity-25 border border-grey-dark text-grey-dark",
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

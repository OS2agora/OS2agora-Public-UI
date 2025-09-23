import clsx from "clsx";

import { Body } from "./Body";

type LinkProps = React.ComponentPropsWithRef<"a"> & {
  classes?: string;
  children: React.ReactNode;
  underline?: boolean;
};

const styling = {
  root: "cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent",
  text: "border-b border-transparent hover:border-grey",
  underline: "underline",
};

const Link = ({ classes, children, underline = false, ...rest }: LinkProps) => {
  const className = clsx(styling.root, underline && styling.underline, classes);
  const textClassName = clsx(!underline && styling.text);

  return (
    <a className={className} {...rest}>
      <Body component="span" type="regular" classes={textClassName}>
        {children}
      </Body>
    </a>
  );
};

export { Link };

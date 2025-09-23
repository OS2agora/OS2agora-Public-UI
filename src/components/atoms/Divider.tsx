import clsx from "clsx";

type DividerProps = {
  classes?: string;
};

const styling = {
  root: "text-grey",
};

const Divider = ({ classes, ...rest }: DividerProps) => {
  const className = clsx(styling.root, classes);

  return <hr {...rest} className={className}></hr>;
};

export { Divider };

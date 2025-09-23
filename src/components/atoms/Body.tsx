import clsx from "clsx";

import { safeIndex, typeCss, Typography } from "./Typography";

type BodyProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "heavy" | "regular";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Body = ({ classes, children, type = "heavy", ...rest }: BodyProps) => {
  const styles = {
    font: "font-Lato text-sm leading-5",
    type: safeIndex(typeCss, type, "heavy"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { Body };

import clsx from "clsx";

import { Typography, typeCss, safeIndex } from "./Typography";

type CaptpionProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "regular" | "heavy" | "large";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Caption = ({ classes, children, type = "regular", ...rest }: CaptpionProps) => {
  const styles = {
    font: `font-Lato uppercase ${type === "large" ? " text-lg leading-5" : " text-xs leading-4"}`,
    type: safeIndex(typeCss, type, "regular"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { Caption };

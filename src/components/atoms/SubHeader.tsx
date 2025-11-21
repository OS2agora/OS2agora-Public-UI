import clsx from "clsx";
import React from "react";

import { Typography, typeCss, safeIndex, colorCss } from "./Typography";

type SubHeaderProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "regular" | "medium" | "heavy";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  colorMode?: "default" | "error";
};

const SubHeader = ({ classes, children, type = "regular", colorMode = "default", ...rest }: SubHeaderProps) => {
  const styles = {
    font: "font-Lato text-base leading-6",
    type: safeIndex(typeCss, type, "regular"),
    color: safeIndex(colorCss, colorMode, "default"),
  };

  const className = clsx(styles.font, styles.type, styles.color, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { SubHeader };

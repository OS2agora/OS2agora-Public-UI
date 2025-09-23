import clsx from "clsx";

import { Typography, typeCss, safeIndex } from "./Typography";

type DisplayProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "heavy";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Display = ({ classes, children, type = "heavy", ...rest }: DisplayProps) => {
  const styles = {
    font: "font-Lato text-4xl leading-12",
    type: safeIndex(typeCss, type, "heavy"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { Display };

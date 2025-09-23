import clsx from "clsx";

import { Typography, typeCss, safeIndex } from "./Typography";

type SubHeaderProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "regular" | "medium" | "heavy";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const SubHeader = ({ classes, children, type = "regular", ...rest }: SubHeaderProps) => {
  const styles = {
    font: "font-Lato text-base leading-6",
    type: safeIndex(typeCss, type, "regular"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { SubHeader };

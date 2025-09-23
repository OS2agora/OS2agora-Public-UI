import clsx from "clsx";

import { Typography, typeCss, safeIndex } from "./Typography";

type SmallProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "regular" | "heavy";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Small = ({ classes, children, type = "regular", ...rest }: SmallProps) => {
  const styles = {
    font: "font-Lato text-xxs leading-2",
    type: safeIndex(typeCss, type, "regular"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { Small };

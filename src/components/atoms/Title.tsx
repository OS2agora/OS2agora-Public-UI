import clsx from "clsx";

import { Typography, typeCss, safeIndex } from "./Typography";

type TitleProps = React.ComponentPropsWithRef<"p"> & {
  classes?: string;
  children: React.ReactNode;
  type?: "light" | "regular" | "heavy";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Title = ({ classes, children, type = "regular", ...rest }: TitleProps) => {
  const styles = {
    font: "font-Lato text-xl leading-7",
    type: safeIndex(typeCss, type, "regular"),
  };

  const className = clsx(styles.font, styles.type, classes);

  return (
    <Typography className={className} {...rest}>
      {children}
    </Typography>
  );
};

export { Title };

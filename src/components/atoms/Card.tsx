import * as React from "react";
import clsx from "clsx";

type CardProps = React.ComponentPropsWithRef<"div"> & {
  classes?: string;
  children: React.ReactNode;
  rounded?: boolean;
  as?: React.ElementType<any>;
};

const styling = {
  root: "shadow-sm",
  rounded: "rounded-sm",
};

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ classes, children, rounded = false, as: Component = "div", ...rest }, ref) => {
    const className = clsx(styling.root, rounded && styling.rounded, classes);

    return (
      <Component ref={ref} className={className} {...rest}>
        {children}
      </Component>
    );
  }
);
Card.displayName = "Card";

export { Card };

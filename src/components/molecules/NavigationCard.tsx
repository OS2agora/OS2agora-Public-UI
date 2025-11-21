import * as React from "react";
import clsx from "clsx";

import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { Body } from "../atoms/Body";
import { ColorCircle } from "../atoms/ColorCircle";

type NavigationCardProps = {
  classes?: string;
  icon: React.ReactNode;
  title: string;
  text: string;
  color: "green" | "blue" | "lightblue";
};

const styling = {
  root:
    "h-26 flex p-6 bg-white cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
  container: "pl-4 flex flex-col",
};

const NavigationCard = React.forwardRef<HTMLDivElement, NavigationCardProps>(
  ({ classes, title, text, icon, color, ...rest }, ref) => {
    const className = clsx(styling.root, classes);

    return (
      <Card as="div" ref={ref} rounded classes={className} {...rest}>
        <ColorCircle as="span" icon={icon} color={color}></ColorCircle>
        <span className={styling.container}>
          <Title component="span" type="heavy">
            {title}
          </Title>
          <Body component="span" type="regular">
            {text}
          </Body>
        </span>
      </Card>
    );
  }
);
NavigationCard.displayName = "NavigationCard";

export { NavigationCard };

import * as React from "react";
import clsx from "clsx";

import { Headline } from "../atoms/Headline";
import { ColoredLine } from "../atoms/ColoredLine";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { Display } from "../atoms/Display";

type TitleBarProps = {
  classes?: string;
  title: string;
};

const styles = {
  root: "bg-white py-4 w-full px-8",
};

const TitleBar = ({ classes, title, ...rest }: TitleBarProps) => {
  const largeDevice = useLargeDeviceUp();
  const className = clsx(classes, styles.root);

  const TextComponent = largeDevice ? Display : Headline;
  const textStyle = largeDevice ? "light" : "heavy";
  const coloredLineThickness = largeDevice ? "large" : "small";

  return (
    <div className={className} {...rest}>
      <TextComponent type={textStyle} component="h1">
        {title}
        <ColoredLine size={coloredLineThickness} position="left" classes="mt-1.5" />
      </TextComponent>
    </div>
  );
};

export { TitleBar };

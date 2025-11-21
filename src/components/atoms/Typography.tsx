import React from "react";

const typeCss = {
  large: "font-normal",
  heavy: "font-extrabold",
  regular: "font-normal",
  medium: "font-medium",
  light: "font-light",
};

const colorCss = {
  error: "text-red",
  default: "text-current",
};

const safeIndex = <T extends Record<string, unknown>, U extends keyof T, Z extends keyof T>(
  object: T,
  key: U,
  defaultKey: Z
) => {
  return key in object ? object[key] : object[defaultKey];
};

type TypographyProps = React.ComponentPropsWithRef<"p"> & {
  className?: string;
  children: React.ReactNode;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
};

const Typography = ({ children, component = "p", ...rest }: TypographyProps) => {
  const Component = component;

  return <Component {...rest}>{children}</Component>;
};

export { Typography, typeCss, safeIndex, colorCss };

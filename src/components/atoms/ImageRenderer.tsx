import clsx from "clsx";
import * as React from "react";
import useImageDimensionsParser from "../../hooks/utility/useImageDimensionsParser";

type ImageRendererProps = React.ComponentPropsWithRef<"img"> & {
  classes?: string;
  aspectRatio?: number;
};

const styling = {
  fitToWidth: "w-full transform -translate-y-1/2",
  fitToHeight: "h-full transform -translate-x-1/2",
};

const getClassName = (width: number, height: number, aspectRatio: number, classes: string | undefined): any => {
  const calculatedAspectRatio = width / height;
  const fitToWidth = calculatedAspectRatio <= aspectRatio;
  return clsx(fitToWidth ? styling.fitToWidth : styling.fitToHeight, classes);
};

const ImageRenderer = ({ alt, src, aspectRatio, onError, classes, ...rest }: ImageRendererProps) => {
  const { width, height } = useImageDimensionsParser(src);
  const className = aspectRatio ? getClassName(width, height, aspectRatio, classes) : classes;

  return <img alt={alt} src={src} onError={onError} className={className} {...rest} />;
};

export { ImageRenderer };

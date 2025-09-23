import clsx from "clsx";

type ColoredLineProps = {
  classes?: string;
  size?: "small" | "large";
  position?: "left" | "center" | "right";
};

const styling = {
  root: "text-blue-center w-14 border-t-2",
  container: "flex",
  size: {
    small: "border-t-2",
    large: "border-t-4",
  },
  position: {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  },
};

const ColoredLine = ({ classes, size = "small", position = "left", ...rest }: ColoredLineProps) => {
  const className = clsx(styling.root, styling.size[size], classes);
  const containerClassName = clsx(styling.container, styling.position[position]);

  return (
    <div className={containerClassName}>
      <hr {...rest} className={className}></hr>
    </div>
  );
};

export { ColoredLine };

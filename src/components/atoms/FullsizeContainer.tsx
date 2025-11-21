import clsx from "clsx";

type FullsizeContainerProps = {
  classes?: string;
  children: React.ReactNode;
};

const styling = {
  root: "-mx-5 tablet:mx-tablet-negative-container desktop:mx-desktop-negative-container w-screen",
};

const FullsizeContainer = ({ classes, children, ...rest }: FullsizeContainerProps) => {
  const className = clsx(styling.root, classes);

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};

export { FullsizeContainer };

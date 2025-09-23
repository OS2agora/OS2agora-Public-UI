import clsx from "clsx";

type ContainerProps = {
  classes?: string;
  children: React.ReactNode;
};

const styling = {
  root: "container tablet:container desktop:container mx-auto",
};

const Container = ({ classes, children, ...rest }: ContainerProps) => {
  const className = clsx(styling.root, classes);

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  );
};

export { Container };

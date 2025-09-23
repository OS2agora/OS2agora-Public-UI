import clsx from "clsx";

type NavigationBarProps = {
  classes?: string;
  children: React.ReactNode;
  fixed?: boolean;
};

const styling = {
  fixed: "flex space-x-4 px-6 py-7 justify-center bg-white fixed bottom-0 left-0 right-0 z-10",
  static: "flex justify-center space-x-4",
};

const NavigationBar = ({ classes, children, fixed = true, ...rest }: NavigationBarProps) => {
  const className = clsx(fixed && styling.fixed, !fixed && styling.static, classes);

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export { NavigationBar };

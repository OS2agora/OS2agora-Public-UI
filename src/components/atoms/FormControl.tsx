import clsx from "clsx";

type FormControlProps = React.ComponentPropsWithRef<"fieldset"> & {
  classes?: string;
  children: React.ReactNode;
};

const styling = {
  root: "",
};

const FormControl = ({ classes, children, ...rest }: FormControlProps) => {
  const className = clsx(styling.root, classes);

  return (
    <fieldset className={className} {...rest}>
      {children}
    </fieldset>
  );
};

export { FormControl };

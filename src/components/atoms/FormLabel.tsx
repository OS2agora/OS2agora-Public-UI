import clsx from "clsx";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { Headline } from "./Headline";
import { Title } from "./Title";

type FormLabelProps = {
  classes?: string;
  children: React.ReactNode;
  isFixedSize?: boolean;
};

const styling = {
  root: "",
};

const FormLabel = ({ classes, children, isFixedSize = false, ...rest }: FormLabelProps) => {
  const largeDevice = useLargeDeviceUp();
  const className = clsx(styling.root, classes);

  const HeadlineComponent = isFixedSize ? Title : largeDevice ? Headline : Title;

  return (
    <legend className={className}>
      <HeadlineComponent type="heavy" {...rest}>
        {children}
      </HeadlineComponent>
    </legend>
  );
};
export { FormLabel };

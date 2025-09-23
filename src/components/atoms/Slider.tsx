import clsx from "clsx";
import { useMediumDeviceUp } from "../../hooks/mediaQueryHooks";

type SliderProps = {
  classes?: string;
  children: React.ReactNode;
  open?: boolean;
};

const styling = {
  root: "h-full w-0 border-l border-grey-light fixed right-0 bg-grey-light overflow-x-hidden",
  open: "w-full tablet:w-96 desktop:w-96",
  coverHeader: "z-30 top-0",
  showHeader: "z-10 top-16",
};

const Slider = ({ classes, children, open = false, ...rest }: SliderProps) => {
  const largeDevice = useMediumDeviceUp();

  const className = clsx(
    styling.root,
    open && styling.open,
    (largeDevice && styling.coverHeader) || styling.showHeader,
    classes
  );

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

export { Slider };

import clsx from "clsx";

import { Small } from "./Small";
import { Body } from "./Body";
import { SubHeader } from "./SubHeader";
import { useMediumDeviceDown, useLargeDeviceUp } from "../../hooks/mediaQueryHooks";

type TitleProps = {
  classes?: string;
  initials?: string;
  onClick: () => void;
};

const styling = {
  root:
    "bg-grey-dark rounded-full flex items-center justify-center text-white h-8 w-8 tablet:h-10 tablet:w-10 desktop:h-12 desktop:w-12",
  container: "focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent",
};

const components = {
  small: Small,
  medium: Body,
  large: SubHeader,
};

const UserCircle = ({ classes, initials = "", onClick, ...rest }: TitleProps) => {
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();

  const size = smallDevice ? "small" : largeDevice ? "large" : "medium";
  const Component = components[size];
  const twoLetterInitials = initials.substring(0, 2).toUpperCase();

  const className = clsx(styling.root, classes);

  return (
    <button className={styling.container} onClick={onClick}>
      <Component component="span" type="regular" {...rest} classes={className}>
        {twoLetterInitials}
      </Component>
    </button>
  );
};

export { UserCircle };

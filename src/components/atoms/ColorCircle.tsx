import clsx from "clsx";

type ColorCircleProps = {
  classes?: string;
  icon: React.ReactNode;
  color?: "green" | "blue" | "lightblue";
  as?: React.ElementType<any>;
};

const styling = {
  root: "h-13 w-13 text-2xl rounded-full flex text-white items-center justify-center",
  background: {
    green: "bg-green-currentHearing",
    blue: "bg-blue-myHearings",
    lightblue: "bg-blue-archivedHearings",
  },
};

// NOTE: This does not look well with all icons
// Consider setting some padding-left
const ColorCircle = ({ classes, icon, color = "green", as: Component = "div", ...rest }: ColorCircleProps) => {
  const className = clsx(styling.root, styling.background[color], classes);

  return (
    <Component {...rest} className={className}>
      {icon}
    </Component>
  );
};

export { ColorCircle };

import clsx from "clsx";

import { Body } from "./Body";
import { Divider } from "./Divider";
import { TrashIcon } from "../icons";
import { downloadFileFromUrl } from "../../utilities/linkHelper";

type FileProps = React.ComponentPropsWithRef<"div"> & {
  classes?: string;
  children: React.ReactNode;
  file: File;
  onDelete: (file: File) => void;
};

const styling = {
  root: "flex justify-between pb-2 items-end",
  text: "text-blue-center underline cursor-pointer",
  icon: "text-blue-dark cursor-pointer shrink-0",
};

const File = ({ classes, children, file, onDelete, ...rest }: FileProps) => {
  const className = clsx(styling.root, classes);

  function onDownload() {
    const downloadUrl = URL.createObjectURL(file);
    downloadFileFromUrl(downloadUrl, file.name);
    URL.revokeObjectURL(downloadUrl);
  }

  return (
    <div>
      <div className={className}>
        <Body component="span" type="regular" classes={styling.text} onClick={onDownload} {...rest}>
          {children}
        </Body>
        <TrashIcon className={styling.icon} onClick={() => onDelete(file)} />
      </div>
      <Divider />
    </div>
  );
};

export { File };

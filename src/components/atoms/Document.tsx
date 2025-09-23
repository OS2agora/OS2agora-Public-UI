import clsx from "clsx";

import { Body } from "./Body";
import { FileIcon } from "../icons";
import { downloadFileFromUrl } from "../../utilities/linkHelper";

type DocumentProps = React.ComponentPropsWithRef<"button"> & {
  classes?: string;
  file: {
    fileName: string;
    filePath: string;
    fileContentType: string;
    urlToDownload: string;
  };
};

const styling = {
  root: "text-blue-center flex space-x-2 items-center cursor-pointer",
  text: "underline",
  icon: "mt-1.5",
};

const Document = ({ classes, file, ...rest }: DocumentProps) => {
  const className = clsx(styling.root, classes);
  function onDownload() {
    return downloadFileFromUrl(file.urlToDownload, file.fileName);
  }

  return (
    <button {...rest} className={className} onClick={onDownload}>
      <FileIcon className={styling.icon} />
      <Body component="span" type="regular" classes={styling.text}>
        {file.fileName}
      </Body>
    </button>
  );
};

export { Document };

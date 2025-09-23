import * as React from "react";

import ArchiveIcon from "./components/Archive";
import CalendarIcon from "./components/Calendar";
import CheckCircleIcon from "./components/CheckCircle";
import CheckSquareIcon from "./components/CheckSquare";
import CheckSquareFilledIcon from "./components/CheckSquareFilled";
import ChevronIcon from "./components/Chevron";
import CircleIcon from "./components/Circle";
import CommentIcon from "./components/Comment";
import DotCircleIcon from "./components/DotCircle";
import EditIcon from "./components/Edit";
import ExclamationCircleIcon from "./components/ExclamationCircle";
import FileIcon from "./components/File";
import FolderIcon from "./components/Folder";
import ListIcon from "./components/List";
import LoupeIcon from "./components/Loupe";
import SpinnerIcon from "./components/Spinner";
import SquareIcon from "./components/Square";
import TimesIcon from "./components/Times";
import TrashIcon from "./components/Trash";
import UploadIcon from "./components/Upload";
import UserCircleIcon from "./components/UserCircle";
import UserEditIcon from "./components/UserEdit";

interface IIconMap {
  [index: string]: React.ReactElement<any, string>;
}

const iconMap: IIconMap = {
  archive: <ArchiveIcon />,
  calendar: <CalendarIcon />,
  checkCircle: <CheckCircleIcon />,
  checkSquare: <CheckSquareIcon />,
  checkSquareFilled: <CheckSquareFilledIcon />,
  chevron: <ChevronIcon />,
  circle: <CircleIcon />,
  comment: <CommentIcon />,
  dotCircle: <DotCircleIcon />,
  edit: <EditIcon />,
  exclamationCircle: <ExclamationCircleIcon />,
  file: <FileIcon />,
  folder: <FolderIcon />,
  list: <ListIcon />,
  loupe: <LoupeIcon />,
  spinner: <SpinnerIcon />,
  square: <SquareIcon />,
  times: <TimesIcon />,
  trash: <TrashIcon />,
  upload: <UploadIcon />,
  userCircle: <UserCircleIcon />,
  userEdit: <UserEditIcon />,
};

export default iconMap;

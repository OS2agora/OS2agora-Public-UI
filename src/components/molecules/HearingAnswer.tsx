import clsx from "clsx";
import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Body } from "../atoms/Body";
import { Caption } from "../atoms/Caption";
import { Card } from "../atoms/Card";
import { Divider } from "../atoms/Divider";
import { Document } from "../atoms/Document";
import { IconButton } from "../atoms/IconButton";
import { Small } from "../atoms/Small";
import { CalendarIcon, EditIcon, TrashIcon } from "../icons";

type HearingAnswerProps = {
  classes?: string;
  canEditComment: boolean;
  children: React.ReactNode;
  documents?: {
    fileName: string;
    filePath: string;
    fileContentType: string;
    urlToDownload: string;
  }[];
  date: string;
  commentNumberLabel: string;
  commentNumber: number;
  isOwner?: boolean;
  onCommentDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onCommentEdit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onBehalfOfLabel: string;
  onBehalfOf?: string;
  editCommentTooltip: string;
  deleteCommentTooltip: string;
};

const styling = {
  root: "p-6 bg-white",
  divider: "mt-8 desktop: mt-10",
  dateContainer: "mt-2 mb-6 tablet:mt-0 tablet:mb-0 flex space-x-2 items-center",
  documentContainer: "mb-6 tablet:mt-6",
  numberEditContainer: "flex justify-between items-center",
  editContainer: "flex space-x-2.5",
  textContainer: "flex space-x-2 text-grey-dark",
  onBehalfOfContainer: "flex space-x-2 text-grey-dark mt-4",
};

const HearingAnswer = ({
  classes,
  canEditComment,
  children,
  documents,
  date,
  commentNumberLabel,
  commentNumber,
  isOwner = false,
  onCommentDelete,
  onCommentEdit,
  onBehalfOfLabel,
  onBehalfOf,
  editCommentTooltip,
  deleteCommentTooltip,
  ...rest
}: HearingAnswerProps) => {
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const className = clsx(styling.root, classes);

  const DateComponent = smallDevice ? Small : largeDevice ? Body : Caption;

  const textLines = (children as string).split("\r\n");

  return (
    <Card rounded classes={className} {...rest}>
      {textLines.map((textLine) =>
        textLine === "" ? (
          <br></br>
        ) : (
          <Body type="regular" key={textLine}>
            {textLine}
          </Body>
        )
      )}
      <Divider classes={styling.divider} />
      {smallDevice && (
        <div className={styling.dateContainer}>
          <CalendarIcon />
          <DateComponent type="regular">{date}</DateComponent>
        </div>
      )}
      <div className={styling.documentContainer}>
        {documents &&
          documents.map((document, index) => {
            return <Document key={index} file={document} />;
          })}
      </div>
      <div className={styling.numberEditContainer}>
        <div>
          <div className={styling.textContainer}>
            <Body type="heavy">{commentNumberLabel}</Body>
            <Body type="regular">{commentNumber}</Body>
          </div>
        </div>
        {isOwner ? (
          <div className={styling.editContainer}>
            <IconButton icon={<TrashIcon />} onClick={onCommentDelete} title={deleteCommentTooltip} />
            {canEditComment ? (
              <IconButton icon={<EditIcon />} onClick={onCommentEdit} title={editCommentTooltip} />
            ) : null}
          </div>
        ) : null}
        {!smallDevice && (
          <div className={styling.dateContainer}>
            <CalendarIcon />
            <DateComponent type="regular">{date}</DateComponent>
          </div>
        )}
      </div>
      {onBehalfOf && (
        <div className={styling.onBehalfOfContainer}>
          <Body type="heavy">{onBehalfOfLabel}</Body>
          <Body type="regular">{onBehalfOf}</Body>
        </div>
      )}
    </Card>
  );
};

export { HearingAnswer };

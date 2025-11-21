import * as React from "react";
import clsx from "clsx";

import { Caption } from "../atoms/Caption";
import { Title } from "../atoms/Title";
import { Body } from "../atoms/Body";
import { Divider } from "../atoms/Divider";
import { TextButton } from "../atoms/TextButton";
import { StatusIndicator } from "../atoms/StatusIndicator";

import { CheckCircleIcon, CommentIcon } from "../icons";
import { Card } from "../atoms/Card";
import { useImages } from "../../hooks/useImages";

type HearingCardProps = {
  classes?: string;
  image: string | undefined;
  imageAlt: string | undefined;
  date: {
    title: string;
    date: string;
    month: string;
  };
  shouldShowComments: boolean;
  comments: string;
  title: string;
  text: string;
  linkText: string;
  status: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
  statusText: string;
  archived?: boolean;
  readCommentsLabel?: string | undefined;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  onReadCommentsClick(event: React.MouseEvent<HTMLButtonElement>): void;
};

const styling = {
  root: "h-full bg-white w-full tablet:w-tablet-hearing-card desktop:w-desktop-hearing-card",
  image: "relative h-52  bg-grey-light bg-cover bg-no-repeat rounded-t",
  dateContainer: "absolute bg-white rounded-b left-4 w-22 h-23 text-center",
  dateText: "text-grey-dark pt-3.5",
  date: "text-blue-center pt-1",
  dateMonth: "text-blue-dark pt-0.5 uppercase",
  commentContainer:
    "absolute bg-white bottom-0 right-0 flex h-8 w-16 space-x-2.5 justify-center items-center text-grey-dark",
  cardContainer: "p-6",
  cardTitle: "text-black pb-2 line-clamp-2",
  cardText: "text-blue-dark line-clamp-3",
  bottomContainer: "pt-6",
  bottomContainerStatus: "flex justify-between",
  archivedIcon: "absolute top-4 right-4 text-green-dark text-xl",
  textContainer: "h-hearing-card-text",
};

const HearingCard = ({
  classes,
  image,
  imageAlt,
  date,
  shouldShowComments,
  comments,
  title,
  text,
  linkText,
  status,
  statusText,
  readCommentsLabel,
  archived = false,
  onClick,
  onReadCommentsClick,
  ...rest
}: HearingCardProps) => {
  const className = clsx(styling.root, classes);
  const images = useImages();

  return (
    <Card {...rest} rounded classes={className}>
      <div
        className={styling.image}
        style={{
          backgroundImage: image ? `url(${image}), url(${images?.fallbackImage})` : `url(${images?.fallbackImage})`,
        }}
        aria-label={imageAlt || "Billede"}
      >
        <div className={styling.dateContainer}>
          <Caption type="light" classes={styling.dateText}>
            {date.title}
          </Caption>
          <Title type="heavy" classes={styling.date}>
            {date.date}
          </Title>
          <Body classes={styling.dateMonth}>{date.month}</Body>
        </div>
        {shouldShowComments && (
          <div className={styling.commentContainer}>
            <CommentIcon />
            <Caption type="heavy">{comments}</Caption>
          </div>
        )}
        {archived ? <CheckCircleIcon className={styling.archivedIcon} /> : null}
      </div>
      <div className={styling.cardContainer}>
        <div className={styling.textContainer}>
          <Title type="heavy" classes={styling.cardTitle}>
            {title}
          </Title>
          <Body type="regular" classes={styling.cardText}>
            {text}
          </Body>
        </div>
        <Divider />
        <div className={styling.bottomContainer}>
          {readCommentsLabel && (
            <TextButton onClick={onReadCommentsClick} role="link">
              {readCommentsLabel}
            </TextButton>
          )}

          <div className={styling.bottomContainerStatus}>
            <TextButton onClick={onClick} role="link">
              {linkText}
            </TextButton>
            <StatusIndicator status={status}>{statusText}</StatusIndicator>
          </div>
        </div>
      </div>
    </Card>
  );
};

export { HearingCard };

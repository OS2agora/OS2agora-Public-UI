import clsx from "clsx";
import React, { MouseEvent } from "react";
import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { Headline } from "../atoms/Headline";
import { Body } from "../atoms/Body";
import { SubHeader } from "../atoms/SubHeader";
import { Button } from "../atoms/Button";
import { useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { initialGlobalmessage } from "../../contexts/AppConfig";
import Backdrop from "../atoms/Backdrop";
import { NavigationBar } from "../atoms/NavigationBar";

type GlobalMessageProps = {
  classes?: string;
};

const styling = {
  root:
    "bg-white p-6 flex flex-col items-center w-full tablet:w-tablet-global-message desktop:w-desktop-global-message fixed z-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
  title: "pb-1",
  text: "text-grey-dark inline",
  buttonContainer: "w-40 tablet:w-72 desktop:w-96 mt-8",
  button: "grow",
};

const strangleClicks = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

const GlobalMessage = ({ classes, ...rest }: GlobalMessageProps) => {
  const appContext = useAppConfigContext();
  const {
    title,
    text,
    buttonText,
    show,
    multipleLineText,
    disableModal,
    canCancel,
    cancelButtonText,
  } = appContext.globalMessage;
  const smallDevice = useMediumDeviceDown();
  const className = clsx(styling.root, classes);

  if (!show) {
    return null;
  }

  function dismissMessage() {
    appContext!.setGlobalMessage(initialGlobalmessage);
    if (appContext?.globalMessage.onDismiss && typeof appContext?.globalMessage.onDismiss === "function") {
      appContext?.globalMessage.onDismiss();
    }
  }

  return (
    <div aria-modal={disableModal ? "false" : "true"} role="dialog">
      <Backdrop show={!disableModal} onClick={strangleClicks} />
      <Card rounded classes={className}>
        {smallDevice ? (
          <Title type="heavy" classes={styling.title}>
            {title}
          </Title>
        ) : (
          <Headline type="heavy" classes={styling.title}>
            {title}
          </Headline>
        )}
        {smallDevice ? (
          <Body type="regular" classes={styling.text}>
            {text}
          </Body>
        ) : (
          <SubHeader classes={styling.text}>{text}</SubHeader>
        )}
        {Array.isArray(multipleLineText)
          ? multipleLineText.map((lineOfText, index) =>
              smallDevice ? (
                <Body type="regular" classes={styling.text} key={index}>
                  {lineOfText}
                </Body>
              ) : (
                <SubHeader classes={styling.text} key={index}>
                  {lineOfText}
                </SubHeader>
              )
            )
          : null}
        <NavigationBar fixed={false} classes={styling.buttonContainer}>
          <Button onClick={dismissMessage} classes={styling.button}>
            {buttonText}
          </Button>
          {canCancel ? (
            <Button
              variant="secondary"
              onClick={() => appContext.setGlobalMessage(initialGlobalmessage)}
              classes={styling.button}
            >
              {cancelButtonText}
            </Button>
          ) : null}
        </NavigationBar>
      </Card>
    </div>
  );
};

export { GlobalMessage };

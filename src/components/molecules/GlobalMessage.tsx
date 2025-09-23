import clsx from "clsx";

import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { Headline } from "../atoms/Headline";
import { Body } from "../atoms/Body";
import { SubHeader } from "../atoms/SubHeader";
import { Button } from "../atoms/Button";
import { useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { initialGlobalmessage } from "../../contexts/AppConfig";

type GlobalMessageProps = {
  classes?: string;
};

const styling = {
  root:
    "bg-white p-6 flex flex-col items-center w-full tablet:w-tabletGlobalMessage desktop:w-desktopGlobalMessage fixed z-20 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
  title: "pb-1",
  text: "text-grey-dark inline",
  button: "w-40 tablet:w-72 desktop:w-96 mt-8",
};

const GlobalMessage = ({ classes, ...rest }: GlobalMessageProps) => {
  const appContext = useAppConfigContext();
  const { title, text, buttonText, show, multipleLineText } = appContext.globalMessage;
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
      <Button onClick={dismissMessage} classes={styling.button}>
        {buttonText}
      </Button>
    </Card>
  );
};

export { GlobalMessage };

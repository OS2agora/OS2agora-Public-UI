import * as React from "react";
import ReactMarkdown from "react-markdown";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { Container } from "../atoms/Container";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";

type NoAccessProps = {
  title: string;
  text: string;
};

const NoAccess = ({ title, text }: NoAccessProps) => {
  const largeDevice = useLargeDeviceUp();
  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <main className="mt-8 desktop:mt-12 flex-1">
      <Container classes="tablet:max-w-tablet-hearing-content desktop:max-w-desktop-hearing-content">
        <div className="mt-10">
          <HeadlineComponent type="heavy">{title}</HeadlineComponent>
          <ReactMarkdown
            source={text}
            // className markdown is used in custom.css
            className="markdown mt-2 tablet:mt-4"
          />
        </div>
      </Container>
    </main>
  );
};

export { NoAccess };

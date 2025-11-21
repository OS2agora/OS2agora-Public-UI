import { Container } from "../atoms/Container";
import ReactMarkdown from "react-markdown";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";

type GlobalContentBodyProps = {
  title: string;
  globalContent: string;
};

const styling = {
  root: "mt-8 desktop:mt-12",
  container: "tablet:max-w-tabletHearingContent desktop:max-w-desktopHearingContent",
  headline: "mt-10 tablet:mt-16",
  markdownContent: "markdown my-2 tablet:my-4",
};

const GlobalContentBody = ({ title, globalContent }: GlobalContentBodyProps) => {
  const largeDevice = useLargeDeviceUp();

  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <main className={styling.root}>
      <Container classes={styling.container}>
        <HeadlineComponent type="heavy" classes={styling.headline}>
          {title}
        </HeadlineComponent>
        <ReactMarkdown
          // className markdown is used in custom.css
          className={styling.markdownContent}
        >
          {globalContent!}
        </ReactMarkdown>
      </Container>
    </main>
  );
};

export { GlobalContentBody };

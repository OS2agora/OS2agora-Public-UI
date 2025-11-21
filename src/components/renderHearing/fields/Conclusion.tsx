import ReactMarkdown from "react-markdown";

import { useLargeDeviceUp } from "../../../hooks/mediaQueryHooks";
import { useTranslation } from "../../../hooks/useTranslation";
import { HearingField } from "../../../utilities/apiHelper";
import { Card } from "../../atoms/Card";
import { Headline } from "../../atoms/Headline";
import { Title } from "../../atoms/Title";
import { CheckCircleIcon } from "../../icons";
import { Document } from "../../atoms/Document";

type ConclusionProps = {
  fieldData: HearingField;
};

const Conclusion = ({ fieldData }: ConclusionProps) => {
  const { translate } = useTranslation();
  const largeDevice = useLargeDeviceUp();
  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <>
      <div className="mt-10">
        <HeadlineComponent type="heavy">{translate("hearing", "conclusionText")}</HeadlineComponent>
        <Card classes="bg-green-highlight p-4 mt-2 tablet:mt-4" rounded>
          <CheckCircleIcon className="text-green-dark" />
          <ReactMarkdown
            source={fieldData.textContent!}
            // className markdown is used in custom.css
            className="markdown pt-2"
          />
          {fieldData.fileContent?.length ? (
            <div className={"mt-4"}>
              {fieldData.fileContent.map((file, index) => (
                <Document key={index} file={file} />
              ))}
            </div>
          ) : null}
        </Card>
      </div>
    </>
  );
};

export { Conclusion };

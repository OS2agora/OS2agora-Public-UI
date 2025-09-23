import ReactMarkdown from "react-markdown/with-html";

import { useLargeDeviceUp } from "../../../hooks/mediaQueryHooks";
import { useTranslation } from "../../../hooks/useTranslation";
import { HearingField } from "../../../utilities/apiHelper";
import { Document } from "../../atoms/Document";
import { Headline } from "../../atoms/Headline";
import { Title } from "../../atoms/Title";

type BodyInformationProps = {
  fieldData: HearingField;
};

const BodyInformation = ({ fieldData }: BodyInformationProps) => {
  const { translate } = useTranslation();
  const largeDevice = useLargeDeviceUp();
  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <>
      <div className="mt-10">
        <HeadlineComponent type="heavy">{translate("hearing", "bodyInformationText")}</HeadlineComponent>
        <ReactMarkdown
          source={fieldData.textContent!}
          // className markdown is used in custom.css
          className="markdown mt-2 tablet:mt-4"
        />
      </div>
      {fieldData.fileContent.length > 0 ? (
        <div className="mt-10">
          <HeadlineComponent type="heavy">{translate("hearing", "bodyInformationFiles")}</HeadlineComponent>
          <div className="mt-4 tablet:mt-8 flex flex-col space-y-2 tablet:space-y-4">
            {fieldData.fileContent
              ? fieldData.fileContent.map((file, index) => {
                  return <Document key={index} file={file} classes="text-left" />;
                })
              : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export { BodyInformation };

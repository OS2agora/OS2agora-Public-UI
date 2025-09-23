import React from "react";
import { useLargeDeviceUp } from "../../../hooks/mediaQueryHooks";
import { useTranslation } from "../../../hooks/useTranslation";
import { HearingField } from "../../../utilities/apiHelper";
import { Headline } from "../../atoms/Headline";
import { SubHeader } from "../../atoms/SubHeader";
import { Title } from "../../atoms/Title";

type SummaryProps = {
  fieldData: HearingField | null;
};

const Summary = ({ fieldData }: SummaryProps) => {
  const { translate } = useTranslation();
  const largeDevice = useLargeDeviceUp();
  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <div className="mt-10 tablet:mt-16">
      <HeadlineComponent type="heavy">{translate("hearing", "summary")}</HeadlineComponent>
      <SubHeader classes="mt-2 tablet:mt-4" type="regular">
        {fieldData?.textContent ?? ""}
      </SubHeader>
    </div>
  );
};

export { Summary };

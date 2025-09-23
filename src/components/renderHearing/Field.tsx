import { HearingField } from "../../utilities/apiHelper";
import { resolveField } from "../../utilities/componentResolver";

type FieldProps = {
  fieldData: HearingField;
};

const Field = ({ fieldData }: FieldProps) => {
  const fieldType = fieldData.fieldType;
  const ResolvedField = resolveField(fieldType);

  if (ResolvedField !== null) {
    return <ResolvedField fieldData={fieldData} />;
  }
  return null;
};

export { Field };

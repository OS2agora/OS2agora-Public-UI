import * as fields from "../components/renderHearing/fields";
import {
  FIELDTYPE_BODYINFORMATION,
  FIELDTYPE_CONCLUSION,
  FIELDTYPE_IMAGE,
  FIELDTYPE_SUMMARY,
  FIELDTYPE_TITLE,
} from "./constants/api";

const mapTypeToComponentName = (type: number) => {
  switch (type) {
    case FIELDTYPE_TITLE:
      return null;
    case FIELDTYPE_IMAGE:
      return null;
    case FIELDTYPE_SUMMARY:
      return "Summary";
    case FIELDTYPE_BODYINFORMATION:
      return "BodyInformation";
    case FIELDTYPE_CONCLUSION:
      return "Conclusion";
    default:
      return null;
  }
};

const resolveField = (fieldType: number) => {
  const componentName = mapTypeToComponentName(fieldType);
  return componentName && fields[componentName];
};

export { resolveField };

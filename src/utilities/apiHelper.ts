import { AxiosError } from "axios";
import { AnswerHearingForm } from "../components/pages/AnswerHearing";
import {
  COMMENTS_RELATIONSHIP,
  HEARING,
  SUBJECTAREA,
  CONTENTTYPE_TEXT,
  CONTENTTYPE_FILE,
  HEARINGSTATUS_RELATIONSHIP,
  HEARINGSTATUS_ACTIVE,
  HEARINGSTATUS_AWAITING_CONCLUSION,
  HEARINGSTATUS_CONCLUDED,
  COMMENT,
  CONTENT_RELATIONSHIP,
  CONTENT,
  FIELD_RELATIONSHIP,
  CONTENTTYPE_RELATIONSHIP,
  FIELDTYPE_RELATIONSHIP,
  USER_RELATIONSHIP,
  GLOBALCONTENT,
  GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS,
  COMMENTTYPE_HEARING_RESPONSE,
  FILEOPERATION_ADD,
  COMMENTSTATUS_AWAITING_APPROVAL,
  FILEOPERATION_DELETE,
  FIELDTYPE_TITLE,
  FIELDTYPE_IMAGE,
  FIELDTYPE_SUMMARY,
  HEARINGSTATUS_AWAITING_STARTDATE,
  GLOBALCONTENTTYPE,
  GLOBALCONTENTTYPE_TYPE,
  GLOBALCONTENT_CONTENT,
  ERRORCODE_FILEUPLOAD,
  ERRORCODE_FORBIDDENACCESS,
  ERRORCODE_INVALIDMODELSTATE,
  ERRORCODE_INVALIDOPERATION,
  ERRORCODE_NOTFOUND,
  ERRORCODE_UNAUTHORIZEDACCESS,
  ERRORCODE_UNKNOWN,
  ERRORCODE_VALIDATION,
  COMMENTTYPE_RELATIONSHIP,
} from "./constants";
import { formatDate } from "./dateHelper";
import { convertDataUrlToFile } from "./fileHelper";
import env from "@beam-australia/react-env";

export const urlJoin = (base: string, relative: string) => {
  const baseUrl = new URL(base);
  return `${baseUrl.href}/${relative}`;
};

export const getApiBaseUrl = () => (typeof window !== "undefined" ? env("API_URL") : process.env.SERVER_ONLY_API_URL);

type HearingOverview = {
  id: string;
  shouldShowComments: boolean;
  numberOfComments: string;
  linkText: string;
  status: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
  statusText: string;
  date: {
    title: string;
    date: string;
    month: string;
  };
  archived: boolean;
  fields: HearingField[];
  title: string | undefined;
  summary: string | undefined;
  image: string | undefined;
  imageAlt: string | undefined;
  hearingStatus: number;
  subjectArea: string;
  deadline: Date;
};

type HearingDetails = {
  id: string;
  shouldShowComments: boolean;
  startDate: string;
  deadline: string;
  status: "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded";
  statusText: string;
  caseNumber: string;
  subjectArea: string;
  departmentName: string;
  contactPersonEmail: string;
  contactPersonName: string;
  contactPersonPhoneNumber: string;
  fields: HearingField[];
  title: string | undefined;
  summaryField: HearingField | undefined;
  image: string | undefined;
  imageAlt: string | undefined;
  hearingStatus: number;
};

type HearingField = {
  id: string;
  displayorder: number;
  fieldType: number;
  contentType: string | number | boolean;
  textContent?: string;
  fileContent: {
    fileName: string;
    filePath: string;
    fileContentType: string;
    urlToDownload: string;
  }[];
  hearingId: string;
};

type HearingComment = {
  commentId: string;
  comment?: string;
  commentNumber: number;
  date: string;
  isCommentOwner: boolean;
  onBehalfOf: string;
  documents: {
    fileName: string;
    filePath: string;
    fileContentType: string;
    urlToDownload: string;
  }[];
};

type TermsAndConditions = {
  text: string;
};

type FileOperationDto = {
  file?: File;
  contentId?: string;
  operation: 1 | 2;
};

type CreateCommentDto = {
  commentType: 1 | 2;
  content: string;
  onBehalfOf?: string;
  fileOperations: FileOperationDto[] | [];
};

type UpdateCommentDto = {
  commentStatus: 1 | 2 | 3;
  content: string;
  onBehalfOf?: string;
  fileOperations: FileOperationDto[] | [];
};

type GlobalContentTypeModel = {
  globalContentType: number;
  id: string;
};

type GlobalContentModel = {
  text: string;
};

interface EntityReferenceWrap {
  data: EntityReference | EntityReference[];
}

interface EntityReference {
  type: string;
  id: string;
}

const hearingStatusToKey: Record<number, "awaiting_startdate" | "active" | "awaiting_conclusion" | "concluded"> = {
  [HEARINGSTATUS_AWAITING_STARTDATE]: "awaiting_startdate",
  [HEARINGSTATUS_ACTIVE]: "active",
  [HEARINGSTATUS_AWAITING_CONCLUSION]: "awaiting_conclusion",
  [HEARINGSTATUS_CONCLUDED]: "concluded",
};

function createHearingStatusToTextMap(translate: (page: string, key: string) => string): Record<number, string> {
  return {
    [HEARINGSTATUS_AWAITING_STARTDATE]: translate("global", "awaitingStartdateText"),
    [HEARINGSTATUS_ACTIVE]: translate("global", "activeStatusText"),
    [HEARINGSTATUS_AWAITING_CONCLUSION]: translate("global", "awaitingConclusionStatusText"),
    [HEARINGSTATUS_CONCLUDED]: translate("global", "concludedStatusText"),
  };
}

function isHearingActive(hearingStatus: number): boolean {
  return hearingStatus === HEARINGSTATUS_ACTIVE || hearingStatus === HEARINGSTATUS_AWAITING_STARTDATE;
}

function isHearingArchived(hearingStatus: number): boolean {
  return hearingStatus === HEARINGSTATUS_CONCLUDED || hearingStatus === HEARINGSTATUS_AWAITING_CONCLUSION;
}

function canCommentOnHearing(hearingStatus: number): boolean {
  return hearingStatus === HEARINGSTATUS_ACTIVE;
}

function getDownloadUrl(url: string): string {
  let localUrl = url;
  const xApiHeader = env("X_API_HEADER");
  if (typeof xApiHeader !== "undefined") {
    localUrl += `?apiKey=${xApiHeader}`;
  }
  return localUrl;
}

function buildCreateCommentDto(values: AnswerHearingForm): CreateCommentDto {
  const content = values.hearingAnswer;
  const fileOperations: FileOperationDto[] = [];

  values.files.forEach((file) => {
    fileOperations.push({
      operation: FILEOPERATION_ADD,
      file,
    });
  });

  return {
    commentType: COMMENTTYPE_HEARING_RESPONSE,
    onBehalfOf: values.showOnBehalfOf ? values.onBehalfOf : undefined,
    content,
    fileOperations,
  };
}

class Entity {
  type: string;

  id: string;

  attributes: { [key: string]: string | number | boolean };

  relationships: Record<string, EntityReferenceWrap>;

  constructor(entity: Entity) {
    this.type = entity.type;
    this.id = entity.id;
    this.attributes = entity.attributes;
    this.relationships = entity.relationships;
  }

  getAttribute(attributeName: string): string | number | boolean | undefined {
    return this.attributes[attributeName];
  }

  getRelationships(relationshipName: string): EntityReference | EntityReference[] | null {
    if (this.relationships[relationshipName]) {
      return this.relationships[relationshipName].data;
    }
    return null;
  }
}

class EntitySet {
  entities: Record<string, { index: Record<string, Entity> }>;

  constructor(...jsonApis: { data: Entity[] | Entity; included?: Entity[] }[]) {
    this.entities = {};
    jsonApis.forEach((jsonApi) => this.addJsonApiDto(jsonApi));
  }

  addType(typename): void {
    if (this.entities[typename] === undefined) {
      this.entities[typename] = { index: {} };
    }
  }

  addEntity(entity: Entity): void {
    const type = entity.type;
    const id = entity.id;

    this.addType(type);
    this.entities[type].index[id] = new Entity(entity);
  }

  getId(entity: Entity): string {
    return entity.id;
  }

  addJsonApiDto(jsonApi: { data: Entity[] | Entity; included?: Entity[] }): void {
    if (Array.isArray(jsonApi.data)) {
      jsonApi.data.forEach((row) => this.addEntity(row));
    } else {
      this.addEntity(jsonApi.data);
    }

    jsonApi.included?.forEach((row) => this.addEntity(row));
  }

  getAllOfType(type: string): Entity[] {
    if (this.entities[type] === undefined) {
      return [];
    }
    return Object.values(this.entities[type].index);
  }

  getEntity(id: string, type: string): Entity | null {
    const possibleentityObject = this?.entities[type]?.index[id];
    if (possibleentityObject === undefined) {
      return null;
    }
    return new Entity(possibleentityObject);
  }

  getEntityByReference(reference: EntityReference): Entity | null {
    return this.getEntity(reference.id, reference.type);
  }

  findEntityWithAttribute(
    type: string,
    attributeName: string,
    attributeValue: string | number | boolean
  ): Entity | undefined {
    const allOfType = this.getAllOfType(type);
    return allOfType.find((entity) => entity.getAttribute(attributeName) === attributeValue);
  }

  findEntityByRelationWithId(type: string, relationshipName: string, id: string): Entity {
    return this.findEntityByRelation(type, relationshipName, (entity) => {
      return entity.id === id;
    });
  }

  findEntitiesByRelationWithId(type: string, relationshipName: string, id: string): Entity[] {
    return this.findEntitiesByRelation(type, relationshipName, (entity) => {
      return entity.id === id;
    });
  }

  findRelatedEntity(type: string, relationshipName: string): Entity {
    return this.findEntityByRelation(type, relationshipName, () => {
      return true;
    });
  }

  findEntitiesByRelation(type: string, relationshipName: string, predicate: (entity: Entity) => boolean): Entity[] {
    const allOfType = this.getAllOfType(type);
    const matching = allOfType.filter((entity: Entity) => {
      const reference = entity.getRelationships(relationshipName);

      if (reference === null) {
        return false;
      }

      if (Array.isArray(reference)) {
        reference.forEach((ref) => {
          const referenceEntity = this.getEntityByReference(ref);
          return referenceEntity && predicate(referenceEntity);
        });
      } else {
        const referenceEntity = this.getEntityByReference(reference);
        return referenceEntity && predicate(referenceEntity);
      }
      return false;
    });
    return matching;
  }

  findEntityByRelation(type: string, relationshipName: string, predicate: (entity: Entity) => boolean): Entity {
    const [entityByRelation] = this.findEntitiesByRelation(type, relationshipName, predicate);
    return entityByRelation;
  }
}

function parseApiErrors(error: AxiosError): string[] {
  const errors = error.response.data.errors;
  const [firstError] = errors;
  const errorCode = firstError && firstError.code;

  switch (errorCode) {
    case ERRORCODE_FILEUPLOAD:
      // eslint-disable-next-line no-case-declarations
      const fileKeys = Object.keys(firstError.meta);
      // eslint-disable-next-line no-case-declarations
      const fileNames = fileKeys.map((key) => firstError.meta[key]);
      return fileNames;
    case ERRORCODE_UNKNOWN:
    case ERRORCODE_NOTFOUND:
    case ERRORCODE_FORBIDDENACCESS:
    case ERRORCODE_INVALIDOPERATION:
    case ERRORCODE_UNAUTHORIZEDACCESS:
    case ERRORCODE_VALIDATION:
    case ERRORCODE_INVALIDMODELSTATE:
    default:
      return [];
  }
}

function getCommentsOfCommentType(type: number, comments: Entity[], entitySet: EntitySet): Entity[] {
  return comments.filter((comment) => {
    const commentTypeReference = comment.getRelationships(COMMENTTYPE_RELATIONSHIP) as EntityReference;
    const commentTypeEntity = entitySet.getEntityByReference(commentTypeReference);
    const commentType = commentTypeEntity.getAttribute("commentType");
    if (commentType === type) {
      return true;
    }
    return false;
  });
}

function getHearingFields(hearingId: string, entitySet: EntitySet): HearingField[] {
  const hearing = entitySet.getEntity(hearingId, HEARING);
  const contentsReferencingHearing = entitySet.findEntitiesByRelationWithId(CONTENT, HEARING, hearing.id);
  const allContent = entitySet.getAllOfType(CONTENT);

  const result: HearingField[] = [];

  contentsReferencingHearing.forEach((content) => {
    const currentContent = allContent.find((entity) => entity.id === content.id);
    const contentFieldReference = currentContent?.getRelationships(FIELD_RELATIONSHIP) as EntityReference;

    if (contentFieldReference === null) {
      return null;
    }

    const contentField = entitySet.getEntityByReference(contentFieldReference);
    const contentTypeReference = currentContent?.getRelationships(CONTENTTYPE_RELATIONSHIP) as EntityReference;

    const contentTypeEntity = entitySet.getEntityByReference(contentTypeReference);
    const contentType = contentTypeEntity.getAttribute("contentType");

    const contentFieldFieldTypeReference = contentField.getRelationships(FIELDTYPE_RELATIONSHIP) as EntityReference;
    const contentFieldFieldType = entitySet.getEntityByReference(contentFieldFieldTypeReference);

    if (contentFieldFieldType === null) {
      return null;
    }

    const fieldType = contentFieldFieldType.getAttribute("fieldType") as number;
    const textContent = currentContent?.getAttribute("textContent") as string;
    const fileName = currentContent?.getAttribute("fileName") as string;
    const filePath = currentContent?.getAttribute("filePath") as string;
    const fileContentType = currentContent?.getAttribute("fileContentType") as string;
    const displayorder = contentField.getAttribute("displayOrder") as number;

    if (result.some((x) => x.fieldType === fieldType)) {
      const existing = result.find((x) => x.fieldType === fieldType);

      if (contentType === CONTENTTYPE_TEXT) {
        existing!.textContent = textContent;
      }
      if (contentType === CONTENTTYPE_FILE) {
        existing!.fileContent.push({
          fileName,
          filePath,
          fileContentType,
          urlToDownload: getDownloadUrl(urlJoin(getApiBaseUrl() as string, `content/${currentContent?.id}/download`)),
        });
      }
    } else {
      result.push({
        id: contentField.id,
        fieldType,
        displayorder,
        contentType,
        textContent: contentType === CONTENTTYPE_TEXT ? textContent : undefined,
        fileContent:
          contentType === CONTENTTYPE_FILE
            ? [
                {
                  fileName,
                  filePath,
                  fileContentType,
                  urlToDownload: getDownloadUrl(
                    urlJoin(getApiBaseUrl() as string, `content/${currentContent?.id}/download`)
                  ),
                },
              ]
            : [],
        hearingId,
      });
    }
  });
  return result.filter((x) => x !== null);
}

function buildHearingOverviewModel(
  hearingId: string,
  linkText: string,
  hearingStatusToText: Record<number, string>,
  deadlineText: string,
  entitySet: EntitySet
): HearingOverview {
  const entity = entitySet.getEntity(hearingId, HEARING);
  const hearingFields = getHearingFields(hearingId, entitySet);

  const shouldShowComments = entity.getAttribute("showComments") as boolean;
  const deadline = entity.getAttribute("deadline") as string;

  const hearingStatusReferenceOnHearing = entity.getRelationships(HEARINGSTATUS_RELATIONSHIP) as EntityReference;

  const hearingStatusOnHearing = entitySet.getEntityByReference(hearingStatusReferenceOnHearing);
  const hearingStatus = hearingStatusOnHearing?.getAttribute("status") as number;

  const subjectAreaReference = entity.getRelationships(SUBJECTAREA) as EntityReference;

  if (subjectAreaReference === null) {
    return null;
  }

  const subjectAreaEntity = entitySet.getEntityByReference(subjectAreaReference);

  if (subjectAreaEntity === null) {
    return null;
  }

  const subjectArea = subjectAreaEntity.getAttribute("name") as string;

  const deadlineAsDate = new Date(deadline);
  const numberOfComments = entity.getAttribute("commentAmount")?.toString() ?? "0";
  const deadlineMonth = deadlineAsDate.toLocaleString("default", {
    month: "long",
  });
  const deadlineDay = deadlineAsDate.toLocaleString("default", {
    day: "2-digit",
  });

  const hearingTitleField = hearingFields.find((x) => x.fieldType === FIELDTYPE_TITLE);
  const hearingTitle = hearingTitleField?.textContent;

  const hearingImageField = hearingFields.find((x) => x.fieldType === FIELDTYPE_IMAGE);
  const hearingImage = hearingImageField?.fileContent[0].urlToDownload;
  const hearingImageAlt = hearingImageField?.textContent;

  const hearingSummaryField = hearingFields.find((x) => x.fieldType === FIELDTYPE_SUMMARY);
  const hearingSummary = hearingSummaryField?.textContent;

  return {
    id: entity.id,
    shouldShowComments,
    numberOfComments,
    linkText,
    status: hearingStatusToKey[hearingStatus],
    statusText: hearingStatusToText[hearingStatus],
    date: {
      title: deadlineText,
      date: deadlineDay,
      month: deadlineMonth,
    },
    archived: hearingStatus === HEARINGSTATUS_CONCLUDED,
    fields: hearingFields,
    title: hearingTitle,
    summary: hearingSummary,
    image: hearingImage,
    imageAlt: hearingImageAlt,
    hearingStatus,
    subjectArea,
    deadline: deadlineAsDate,
  };
}

function buildHearingModel(
  hearingId: string,
  hearingStatusToText: Record<number, string>,
  entitySet: EntitySet
): HearingDetails {
  const entity = entitySet.getEntity(hearingId, HEARING);
  const hearingFields = getHearingFields(hearingId, entitySet);

  const shouldShowComments = entity.getAttribute("showComments") as boolean;
  const deadline = entity.getAttribute("deadline") as string;
  const startDate = entity.getAttribute("startDate") as string;
  const esdhTitle = entity.getAttribute("esdhNumber") as string;
  const departmentName = entity.getAttribute("contactPersonDepartmentName") as string;
  const contactPersonEmail = entity.getAttribute("contactPersonEmail") as string;
  const contactPersonName = entity.getAttribute("contactPersonName") as string;
  const contactPersonPhoneNumber = entity.getAttribute("contactPersonPhoneNumber") as string;

  const hearingStatusReferenceOnHearing = entity.getRelationships(HEARINGSTATUS_RELATIONSHIP) as EntityReference;
  const hearingStatusOnHearing = entitySet.getEntityByReference(hearingStatusReferenceOnHearing);
  const hearingStatus = hearingStatusOnHearing?.getAttribute("status") as number;

  const subjectAreaReference = entity.getRelationships(SUBJECTAREA) as EntityReference | null;
  const subjectAreaEntity = subjectAreaReference && entitySet.getEntityByReference(subjectAreaReference);
  const subjectArea = (subjectAreaEntity?.getAttribute("name") as string) || "";

  const deadlineText = formatDate(deadline);
  const startDateText = formatDate(startDate);

  const hearingTitleField = hearingFields.find((x) => x.fieldType === FIELDTYPE_TITLE);
  const hearingTitle = hearingTitleField?.textContent;

  const hearingImageField = hearingFields.find((x) => x.fieldType === FIELDTYPE_IMAGE);
  const hearingImage = hearingImageField?.fileContent[0].urlToDownload;
  const hearingImageAlt = hearingImageField?.textContent;

  const hearingSummaryField = hearingFields.find((x) => x.fieldType === FIELDTYPE_SUMMARY);

  return {
    id: hearingId,
    shouldShowComments,
    startDate: startDateText,
    deadline: deadlineText,
    status: hearingStatusToKey[hearingStatus],
    statusText: hearingStatusToText[hearingStatus],
    caseNumber: esdhTitle,
    subjectArea,
    departmentName,
    contactPersonEmail,
    contactPersonName,
    contactPersonPhoneNumber,
    fields: hearingFields,
    title: hearingTitle,
    summaryField: hearingSummaryField,
    image: hearingImage,
    imageAlt: hearingImageAlt,
    hearingStatus,
  };
}

function buildCommentsModel(identifier: string | undefined, entitySet: EntitySet): HearingComment[] {
  const comments = entitySet.getAllOfType(COMMENT);
  const allContent = entitySet.getAllOfType(CONTENT);

  const hearingResponses = getCommentsOfCommentType(COMMENTTYPE_HEARING_RESPONSE, comments, entitySet);

  const result: HearingComment[] = [];

  hearingResponses.forEach((hearingResponse) => {
    const userReference = hearingResponse.getRelationships(USER_RELATIONSHIP) as EntityReference;
    const userEntity = entitySet.getEntityByReference(userReference);
    const isCommentOwner = userEntity.getAttribute("identifier") === identifier;

    const contentReferencesOnComment = hearingResponse.getRelationships(CONTENT_RELATIONSHIP) as EntityReference[];

    contentReferencesOnComment.forEach((content) => {
      const currentContent = allContent.find((entity) => entity.id === content.id);

      const contentTypeReference = currentContent?.getRelationships(CONTENTTYPE_RELATIONSHIP) as EntityReference;
      const contentTypeEntity = entitySet.getEntityByReference(contentTypeReference);
      const contentType = contentTypeEntity.getAttribute("contentType");

      const commentId = hearingResponse.id;
      const createdDate = hearingResponse.getAttribute("created") as string;
      const commentNumber = hearingResponse.getAttribute("number") as number;
      const onBehalfOf = hearingResponse?.getAttribute("onBehalfOf") as string;
      const textContent = currentContent?.getAttribute("textContent") as string;
      const fileName = currentContent?.getAttribute("fileName") as string;
      const filePath = currentContent?.getAttribute("filePath") as string;
      const fileContentType = currentContent?.getAttribute("fileContentType") as string;

      if (result.some((x) => x.commentId === commentId)) {
        const existing = result.find((x) => x.commentId === commentId);

        if (contentType === CONTENTTYPE_TEXT) {
          existing!.comment = currentContent?.getAttribute("textContent") as string;
        }
        if (contentType === CONTENTTYPE_FILE) {
          existing!.documents.push({
            fileName,
            filePath,
            fileContentType,
            urlToDownload: urlJoin(getApiBaseUrl() as string, `content/${currentContent?.id}/download`),
          });
        }
      } else {
        result.push({
          comment: contentType === CONTENTTYPE_TEXT ? textContent : undefined,
          commentId,
          commentNumber,
          date: formatDate(createdDate),
          isCommentOwner,
          onBehalfOf,
          documents:
            contentType === CONTENTTYPE_FILE
              ? [
                  {
                    fileName,
                    filePath,
                    fileContentType,
                    urlToDownload: urlJoin(getApiBaseUrl() as string, `content/${currentContent?.id}/download`),
                  },
                ]
              : [],
        });
      }
    });
  });
  return result;
}

async function buildFormFromComment(commentId: string | undefined, entitySet: EntitySet): Promise<AnswerHearingForm> {
  if (typeof commentId === "undefined") {
    return {
      conditions: false,
      files: [],
      hearingAnswer: "",
      onBehalfOf: "",
      showOnBehalfOf: false,
    };
  }

  const comments = entitySet.getAllOfType(COMMENT);
  const comment = comments.find((localComment) => localComment.id === commentId);

  if (typeof comment === "undefined") {
    return {
      conditions: false,
      files: [],
      hearingAnswer: "",
      onBehalfOf: "",
      showOnBehalfOf: false,
    };
  }

  const allContent = entitySet.getAllOfType(CONTENT);

  const contentReferencesOnComment = comment.getRelationships(CONTENT_RELATIONSHIP) as EntityReference[];

  const onBehalfOf = comment.getAttribute("onBehalfOf") as string;
  let hearingAnswer = "";
  const files: File[] = [];

  await Promise.all(
    contentReferencesOnComment.map(async (content) => {
      const currentContent = allContent.find((entity) => entity.id === content.id);

      const contentTypeReference = currentContent?.getRelationships(CONTENTTYPE_RELATIONSHIP) as EntityReference;
      const contentTypeEntity = entitySet.getEntityByReference(contentTypeReference);
      const contentType = contentTypeEntity.getAttribute("contentType");

      if (contentType === CONTENTTYPE_TEXT) {
        const textContent = currentContent?.getAttribute("textContent") as string;
        hearingAnswer = textContent;
      }

      if (contentType === CONTENTTYPE_FILE) {
        const fileName = currentContent?.getAttribute("fileName") as string;
        const fileContentType = currentContent?.getAttribute("fileContentType") as string;
        const downloadUrl = urlJoin(getApiBaseUrl() as string, `content/${currentContent?.id}/download`);

        const contentAsFile = await convertDataUrlToFile(downloadUrl, fileName, fileContentType);

        if (contentAsFile) {
          files.push(contentAsFile);
        }
      }
    })
  );
  return {
    conditions: false,
    showOnBehalfOf: typeof onBehalfOf !== "undefined",
    onBehalfOf: typeof onBehalfOf !== "undefined" ? onBehalfOf : "",
    hearingAnswer,
    files,
  };
}

function buildUpdateCommentDto(values: AnswerHearingForm, commentId: string, entitySet: EntitySet): UpdateCommentDto {
  const allComments = entitySet.getAllOfType(COMMENT);
  const currentComment = allComments.find((comment) => comment.id === commentId);
  const allContent = entitySet.getAllOfType(CONTENT);

  if (typeof currentComment === "undefined") {
    throw Error("Comment not found");
  }

  const content = values.hearingAnswer;
  const fileOperations: FileOperationDto[] = [];
  const existingContent: { fileName: string; contentId: string }[] = [];

  const contentReferencesOnComment = currentComment.getRelationships(CONTENT_RELATIONSHIP) as EntityReference[];

  contentReferencesOnComment.forEach((localContent) => {
    const currentContent = allContent.find((entity) => entity.id === localContent.id);

    const contentTypeReference = currentContent?.getRelationships(CONTENTTYPE_RELATIONSHIP) as EntityReference;
    const contentTypeEntity = entitySet.getEntityByReference(contentTypeReference);
    const contentType = contentTypeEntity.getAttribute("contentType");

    if (contentType === CONTENTTYPE_FILE) {
      const fileName = currentContent?.getAttribute("fileName") as string;
      existingContent.push({
        fileName,
        contentId: currentContent?.id as string,
      });
    }
  });

  existingContent.forEach((localExistingContent) => {
    const fileExistsInBothListAndDb = values.files.find((file) => file.name === localExistingContent.fileName);
    const isFileRemovedFromList = typeof fileExistsInBothListAndDb === "undefined";

    if (isFileRemovedFromList) {
      fileOperations.push({
        operation: FILEOPERATION_DELETE,
        contentId: localExistingContent.contentId,
      });
    }
  });

  values.files.forEach((file) => {
    const fileExistInBothListAndDb = existingContent.find(
      (localExistingContent) => localExistingContent.fileName === file.name
    );
    const isUploadingNewFile = typeof fileExistInBothListAndDb === "undefined";

    if (isUploadingNewFile) {
      fileOperations.push({
        operation: FILEOPERATION_ADD,
        file,
      });
    }
  });

  return {
    commentStatus: COMMENTSTATUS_AWAITING_APPROVAL,
    content,
    onBehalfOf: values.showOnBehalfOf ? values.onBehalfOf : undefined,
    fileOperations,
  };
}

function buildGlobalContentTypesModel(entitySet: EntitySet): GlobalContentTypeModel[] {
  const allGlobalContentTypes = entitySet.getAllOfType(GLOBALCONTENTTYPE);
  const result: GlobalContentTypeModel[] = [];

  allGlobalContentTypes.forEach((globalContentType) => {
    const type = globalContentType.getAttribute(GLOBALCONTENTTYPE_TYPE) as number;
    result.push({ globalContentType: type, id: globalContentType.id });
  });

  return result;
}

function buildGlobalContentModel(entitySet: EntitySet): GlobalContentModel {
  const globalContentEntities = entitySet.getAllOfType(GLOBALCONTENT);
  if (globalContentEntities.length > 0) {
    const globalContentEntity = globalContentEntities[0];
    const text = globalContentEntity.getAttribute(GLOBALCONTENT_CONTENT) as string;
    return { text };
  } else {
    return { text: "" };
  }
}

function doesUserHaveRoleOnHearing(hearingId: string, entitySet: EntitySet, userIdentifier?: string): boolean {
  if (typeof userIdentifier === "undefined") {
    return false;
  }

  const hearing = entitySet.getEntity(hearingId, HEARING);
  const userHearingRoles = hearing.getRelationships("userHearingRoles") as EntityReference[] | undefined;

  if (typeof userHearingRoles === "undefined") {
    return false;
  }

  const allUserHeringRoles = entitySet.getAllOfType("userHearingRole");

  return userHearingRoles.some((uhr) => {
    const userHearingRole = allUserHeringRoles.find((singleUhr) => uhr.id === singleUhr.id);

    if (typeof userHearingRole === "undefined") {
      return false;
    }

    const userReference = userHearingRole?.getRelationships("user") as EntityReference | undefined;

    if (typeof userReference === "undefined") {
      return false;
    }

    const userEntity = entitySet.getEntityByReference(userReference);
    const userEntityIdentifier = userEntity.getAttribute("identifier") as string;
    return userEntityIdentifier === userIdentifier;
  });
}

export {
  EntitySet,
  createHearingStatusToTextMap,
  isHearingActive,
  isHearingArchived,
  canCommentOnHearing,
  buildCreateCommentDto,
  parseApiErrors,
  buildHearingOverviewModel,
  buildHearingModel,
  buildCommentsModel,
  buildFormFromComment,
  buildUpdateCommentDto,
  buildGlobalContentTypesModel,
  buildGlobalContentModel,
  doesUserHaveRoleOnHearing,
};
export type {
  HearingOverview,
  HearingDetails,
  HearingField,
  HearingComment,
  TermsAndConditions,
  CreateCommentDto,
  UpdateCommentDto,
  GlobalContentTypeModel,
  GlobalContentModel,
  EntityReference,
  Entity,
};

// -------- Includes --------
export const FIELDTYPE_INCLUDE = "fieldType";

// -------- Relationships --------
export const FIELDTYPE_RELATIONSHIP = "fieldType";
export const FIELD_RELATIONSHIP = "field";
export const COMMENTS_RELATIONSHIP = "comments";
export const HEARINGSTATUS_RELATIONSHIP = "hearingStatus";
export const USERHEARINGROLES_RELATIONSHIP = "userHearingRoles";
export const HEARINGROLE_RELATIONSHIP = "hearingRoles";
export const COMMENTTYPE_RELATIONSHIP = "commentType";
export const CONTENT_RELATIONSHIP = "contents";
export const CONTENTTYPE_RELATIONSHIP = "contentType";
export const USER_RELATIONSHIP = "user";
export const USER_CAPACITY_RELATIONSHIP = "userCapacity";
export const COMPANY_RELATIONSHIP = "company";
export const COMPANYHEARINGROLE_RELATIONSHIP = "companyHearingRoles";

// -------- Attribtues --------
export const FIELDTYPE_FIELDTYPE = "fieldType";
export const GLOBALCONTENTTYPE_TYPE = "globalContentType";
export const GLOBALCONTENT_CONTENT = "content";
export const NAME = "name";
export const IDENTIFIER = "identifier";
export const IS_ADMINISTRATOR = "isAdministrator";
export const IS_HEARINGCREATOR = "isHearingCreator";
export const CAPACITY = "capacity";
export const POSTAL_CODE = "postalCode";
export const CITY = "city";
export const STREET_NAME = "streetName";

// -------- Models --------
export const HEARING = "hearing";
export const FIELD = "field";
export const CONTENT = "content";
export const SUBJECTAREA = "subjectArea";
export const CITYAREA = "cityArea";
export const COMMENT = "comment";
export const GLOBALCONTENT = "globalContent";
export const GLOBALCONTENTTYPE = "globalContentType";
export const USERHEARINGROLE = "userHearingRole";
export const HEARINGROLE = "hearingRole";
export const USER = "user";
export const COMPANY = "company";
export const COMPANYHEARINGROLE = "companyHearingRole";

// -------- ENUMS --------
export const FIELDTYPE_TITLE = 1;
export const FIELDTYPE_SUMMARY = 2;
export const FIELDTYPE_BODYINFORMATION = 3;
export const FIELDTYPE_CONCLUSION = 4;
export const FIELDTYPE_ESDH_TITLE = 5;
export const FIELDTYPE_IMAGE = 6;

export const HEARINGSTATUS_CREATED = 1;
export const HEARINGSTATUS_DRAFT = 2;
export const HEARINGSTATUS_AWAITING_STARTDATE = 3;
export const HEARINGSTATUS_ACTIVE = 4;
export const HEARINGSTATUS_AWAITING_CONCLUSION = 5;
export const HEARINGSTATUS_CONCLUDED = 6;

export const HEARINGROLE_OWNER = 1;
export const HEARINGROLE_INVITEE = 2;
export const HEARINGROLE_REVIEWER = 3;
export const HEARINGROLE_RESPONDER = 4;

export const CONTENTTYPE_TEXT = 1;
export const CONTENTTYPE_FILE = 2;

export const GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS = 1;
export const GLOBALCONTENTTYPE_COOKIE_INFORMATION = 2;

export const COMMENTTYPE_HEARING_RESPONSE = 1;

export const FILEOPERATION_ADD = 1;
export const FILEOPERATION_DELETE = 2;

export const COMMENTSTATUS_AWAITING_APPROVAL = 1;

export const USER_CAPACITY_EMPLOYEE = 1;
export const USER_CAPACITY_CITIZEN = 2;
export const USER_CAPACITY_COMPANY = 3;

// -------- ERROR CODES --------
export const ERRORCODE_UNKNOWN = "0";
export const ERRORCODE_NOTFOUND = "1";
export const ERRORCODE_FORBIDDENACCESS = "2";
export const ERRORCODE_INVALIDOPERATION = "3";
export const ERRORCODE_UNAUTHORIZEDACCESS = "4";
export const ERRORCODE_VALIDATION = "5";
export const ERRORCODE_INVALIDMODELSTATE = "6";
export const ERRORCODE_FILEUPLOAD = "7";

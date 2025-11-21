import * as React from "react";
import { boolean, text } from "@storybook/addon-knobs";

import { HearingContactInformation as HearingContactInformationMolecule } from "../components/molecules/HearingContactInformation";

export default {
  title: "Design System/Molecules/Hearing Contact Information",
};

const knobDepartmentTitle = () => text("Department Title", "Afdelingsnavn", "HearingContactInformation");
const knobDepartment = () => text("Department", "By, Byggeri og Ejendomme", "HearingContactInformation");
const knobContactPersonTitle = () => text("Contact Person Title", "Kontaktperson", "HearingContactInformation");
const knobContactPerson = () => text("Contact Person", "Byggemand bob", "HearingContactInformation");
const knobEmailTitle = () => text("Email Title", "E-mail", "HearingContactInformation");
const knobEmail = () => text("Email", "bygge@bob.dk", "HearingContactInformation");
const knobPhoneNumberTitle = () => text("Phone Number Title", "Telefon", "HearingContactInformation");
const knobPhoneNumber = () => text("Phone Number", "+45 1234 5678", "HearingContactInformation");
const knobEmailLinkText = () => text("Email Link Text", "Klik her", "HearingContactInformation");
const knobEmailAsLink = () => boolean("Email as Link", false, "HearingContactInformation");

export const HearingContactInformation = () => (
  <HearingContactInformationMolecule
    departmentTitle={knobDepartmentTitle()}
    department={knobDepartment()}
    contactpersonTitle={knobContactPersonTitle()}
    contactPerson={knobContactPerson()}
    emailTitle={knobEmailTitle()}
    email={knobEmail()}
    phoneNumberTitle={knobPhoneNumberTitle()}
    phoneNumber={knobPhoneNumber()}
    emailLinkText={knobEmailLinkText()}
    renderEmailAsLink={knobEmailAsLink()}
  />
);

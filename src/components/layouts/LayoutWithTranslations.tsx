import React from "react";
import { useTranslation } from "../../hooks/useTranslation";
import { Layout } from "../molecules/Layout";
import { useImages } from "../../hooks/useImages";
import { COOKIE_INFORMATION_ROUTE, DECLARATION_OF_ACCESSIBILITY_ROUTE } from "../../utilities/constants/routes";

type LayoutWithTranslationsProps = {
  children: React.ReactNode;
};

// returns empty list if the href is not defined, otherwise returns list containing a signle linkProp
const getLinkProp = (text: string, href: string): { text: string; href: string }[] => {
  if (href) {
    return [
      {
        text,
        href,
      },
    ];
  }
  return [];
};

const LayoutWithTranslations = ({ children, ...rest }: LayoutWithTranslationsProps) => {
  const { translate } = useTranslation();
  const images = useImages();

  return (
    <Layout
      header={{
        image: { src: images?.headerLogo, alt: translate("header", "logoAltText") },
        title: translate("header", "title"),
        preTitle: translate("header", "preTitle"),
        loginText: translate("header", "loginText"),
        logoutText: translate("header", "logoutText"),
        myHearingsText: translate("header", "myHearingsText"),
        loggedOnBehalfOfText: translate("header", "loggedInOnBehalfOf"),
      }}
      loginModal={{
        title: translate("loginModal", "title"),
        loginCitizenOrCompanyText: translate("loginModal", "loginCitizenOrCompanyText"),
        loginEmployeeText: translate("loginModal", "loginEmployeeText"),
      }}
      footer={{
        image: { src: images?.footerLogo, alt: translate("footer", "logoAltText") },
        textLines: [
          translate("footer", "municipalityHeader1"),
          translate("footer", "municipalityHeader2"),
          translate("footer", "street"),
          translate("footer", "city"),
          translate("footer", "phone"),
          translate("footer", "fax"),
          translate("footer", "cvr"),
        ],
        internalLinks: [
          { text: translate("footer", "declarationOfAvailability"), href: DECLARATION_OF_ACCESSIBILITY_ROUTE },
          { text: translate("footer", "dataprotection"), href: translate("footer", "dataprotectionLink") },
          { text: translate("footer", "cookieInformation"), href: COOKIE_INFORMATION_ROUTE },
        ],
        // external links are only rendered if the href-value is defined in translations for the specific municipality
        externalLinks: [
          ...getLinkProp(
            translate("footer", "externalLinkMunicipalityText"),
            translate("footer", "externalLinkMunicipalityLink")
          ),
          ...getLinkProp(
            translate("footer", "externalLinkContactText"),
            translate("footer", "externalLinkContactLink")
          ),
        ],
      }}
    >
      {children}
    </Layout>
  );
};

export { LayoutWithTranslations };

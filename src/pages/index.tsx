import Head from "next/head";
import NextLink from "next/link";
import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useMediumDeviceDown } from "../hooks/mediaQueryHooks";
import { Headline } from "../components/atoms/Headline";
import { Display } from "../components/atoms/Display";
import { Body } from "../components/atoms/Body";
import { SubHeader } from "../components/atoms/SubHeader";
import { ColoredLine } from "../components/atoms/ColoredLine";
import { NavigationCard } from "../components/molecules/NavigationCard";
import { FolderIcon, UserEditIcon, ArchiveIcon } from "../components/icons";
import { useTranslation } from "../hooks/useTranslation";
import { Container } from "../components/atoms/Container";
import { ImageRenderer } from "../components/atoms/ImageRenderer";
import { useImages } from "../hooks/useImages";
import { useAppConfigContext } from "../hooks/useAppConfig";
import { ACTIVE_HEARINGS_ROUTE, MY_HEARINGS_ROUTE, ARCHIVED_HEARINGS_ROUTE } from "../utilities/constants/routes";

export default function Home() {
  const smallDevice = useMediumDeviceDown();
  const { translate } = useTranslation();
  const { pagination } = useAppConfigContext();
  const images = useImages();

  const TitleComponent = smallDevice ? Headline : Display;
  const TextComponent = smallDevice ? Body : SubHeader;

  const activeHearingsPageRoute = pagination.hearings.enabled
    ? `${ACTIVE_HEARINGS_ROUTE}?Page=1`
    : ACTIVE_HEARINGS_ROUTE;
  const myHearingsPageRoute = pagination.hearings.enabled ? `${MY_HEARINGS_ROUTE}?Page=1` : MY_HEARINGS_ROUTE;
  const archivedHearingsPageRoute = pagination.hearings.enabled
    ? `${ARCHIVED_HEARINGS_ROUTE}?Page=1`
    : ARCHIVED_HEARINGS_ROUTE;

  return (
    <Container classes="flex-1">
      <Head>
        <title>{translate("frontpage", "metaTitle")}</title>
        <meta name="Description" content={translate("frontpage", "metaDescription")}></meta>
        <link rel="icon" href={images ? images?.headerLogo : ""} />
      </Head>

      <main className="flex flex-col tablet:items-center pt-10">
        {!smallDevice ? (
          <NextLink
            href="/"
            className="cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent"
          >
            {images?.mainLogo ? (
              <ImageRenderer
                src={images?.mainLogo}
                alt={translate("frontpage", "imageAlt")}
                width={67}
                height={82}
                className="cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent"
              />
            ) : null}
          </NextLink>
        ) : null}

        <TitleComponent type="heavy" component="h1">
          {translate("frontpage", "title")}
          <ColoredLine size="large" position={smallDevice ? "left" : "center"} classes="mt-2 mb-4" />
        </TitleComponent>

        <TextComponent type="regular" classes="text-center">
          {translate("frontpage", "text")}
        </TextComponent>
        <div className="mt-14 mb-20 flex flex-col space-y-4 tablet:space-y-6">
          <NextLink href={activeHearingsPageRoute} passHref>
            <NavigationCard
              title={translate("frontpage", "card1Title")}
              text={translate("frontpage", "card1Text")}
              icon={<FolderIcon className="ml-1" aria-label={translate("frontpage", "card1AriaLabel")} />}
              color="green"
            ></NavigationCard>
          </NextLink>
          <NextLink href={myHearingsPageRoute} passHref>
            <NavigationCard
              title={translate("frontpage", "card2Title")}
              text={translate("frontpage", "card2Text")}
              icon={<UserEditIcon className="ml-1" aria-label={translate("frontpage", "card2AriaLabel")} />}
              color="blue"
            ></NavigationCard>
          </NextLink>
          <NextLink href={archivedHearingsPageRoute} passHref>
            <NavigationCard
              title={translate("frontpage", "card3Title")}
              text={translate("frontpage", "card3Text")}
              icon={<ArchiveIcon aria-label={translate("frontpage", "card3AriaLabel")} />}
              color="lightblue"
            ></NavigationCard>
          </NextLink>
        </div>
      </main>
    </Container>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

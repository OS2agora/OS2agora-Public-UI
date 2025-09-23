import Head from "next/head";
import NextLink from "next/link";

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

export default function Home() {
  const smallDevice = useMediumDeviceDown();
  const { translate } = useTranslation();

  const TitleComponent = smallDevice ? Headline : Display;
  const TextComponent = smallDevice ? Body : SubHeader;

  return (
    <Container classes="flex-1">
      <Head>
        <title>{translate("frontpage", "metaTitle")}</title>
        <meta name="Description" content={translate("frontpage", "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
        <script
          id="CookieConsent"
          src="https://policy.app.cookieinformation.com/uc.js"
          data-culture="DA"
          type="text/javascript"
        ></script>
      </Head>

      <main className="flex flex-col tablet:items-center pt-10">
        {!smallDevice ? (
          <NextLink href="/">
            <a
              href="/"
              className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent"
            >
              <ImageRenderer
                src="/logo.png"
                alt={translate("frontpage", "imageAlt")}
                width={67}
                height={82}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent"
              />
            </a>
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
          <NextLink href="/activeHearings" passHref>
            <NavigationCard
              title={translate("frontpage", "card1Title")}
              text={translate("frontpage", "card1Text")}
              icon={<FolderIcon className="ml-1" aria-label={translate("frontpage", "card1AriaLabel")} />}
              color="green"
            ></NavigationCard>
          </NextLink>
          <NextLink href="/myHearings" passHref>
            <NavigationCard
              title={translate("frontpage", "card2Title")}
              text={translate("frontpage", "card2Text")}
              icon={<UserEditIcon className="ml-1" aria-label={translate("frontpage", "card2AriaLabel")} />}
              color="blue"
            ></NavigationCard>
          </NextLink>
          <NextLink href="/archivedHearings" passHref>
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

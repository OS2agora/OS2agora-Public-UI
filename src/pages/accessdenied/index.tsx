import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Container } from "../../components/atoms/Container";
import { Headline } from "../../components/atoms/Headline";
import { SubHeader } from "../../components/atoms/SubHeader";
import { TextButton } from "../../components/atoms/TextButton";
import { Title } from "../../components/atoms/Title";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { useTranslation } from "../../hooks/useTranslation";
import { ACCESS_DENIED_PAGE } from "../../utilities/constants/pages";

// Routes to /accessdenied
export default function Accessdenied() {
  const router = useRouter();
  const largeDevice = useLargeDeviceUp();
  const appContext = useAppConfigContext();
  const { translate } = useTranslation();

  const { redirectUri } = router.query;
  const HeadlineComponent = largeDevice ? Headline : Title;

  return (
    <div className="flex-1">
      <Head>
        <title>{translate(ACCESS_DENIED_PAGE, "metaTitle")}</title>
        <meta name="Description" content={translate(ACCESS_DENIED_PAGE, "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="mt-8 desktop:mt-12">
        <Container classes="tablet:max-w-tablet-hearing-content desktop:max-w-desktop-hearing-content">
          <HeadlineComponent type="heavy" classes="mt-10 tablet:mt-16">
            {translate(ACCESS_DENIED_PAGE, "title")}
          </HeadlineComponent>
          <SubHeader classes="mt-2 tablet:mt-4" type="regular">
            {translate(ACCESS_DENIED_PAGE, "text")}
          </SubHeader>
        </Container>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

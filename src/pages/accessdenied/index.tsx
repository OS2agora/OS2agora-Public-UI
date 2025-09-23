import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "../../components/atoms/Container";
import { Headline } from "../../components/atoms/Headline";
import { SubHeader } from "../../components/atoms/SubHeader";
import { TextButton } from "../../components/atoms/TextButton";
import { Title } from "../../components/atoms/Title";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { useTranslation } from "../../hooks/useTranslation";

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
        <title>{translate("accessdenied", "metaTitle")}</title>
        <meta name="Description" content={translate("accessdenied", "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="mt-8 desktop:mt-12">
        <Container classes="tablet:max-w-tabletHearingContent desktop:max-w-desktopHearingContent">
          <HeadlineComponent type="heavy" classes="mt-10 tablet:mt-16">
            {translate("accessdenied", "title")}
          </HeadlineComponent>
          <SubHeader classes="mt-2 tablet:mt-4" type="regular">
            {translate("accessdenied", "text")}
          </SubHeader>
          <TextButton
            classes="mt-10 tablet:mt-1 4 desktop:mt-16 mb-8 tablet:mb-20"
            onClick={() => appContext?.doLogin(redirectUri as string)}
          >
            {translate("accessdenied", "buttonText")}
          </TextButton>
        </Container>
      </main>
    </div>
  );
}

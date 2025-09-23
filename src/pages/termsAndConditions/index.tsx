import { GetStaticPropsContext } from "next";
import Head from "next/head";
import ReactMarkdown from "react-markdown";

import { Container } from "../../components/atoms/Container";
import { Headline } from "../../components/atoms/Headline";
import { GlobalLoading } from "../../components/atoms/GlobalLoading";
import { Title } from "../../components/atoms/Title";
import { useLargeDeviceUp } from "../../hooks/mediaQueryHooks";
import { useGetGlobalContent } from "../../hooks/pages/useGetGlobalContent";
import { useGetGlobalContentTypeId } from "../../hooks/pages/useGetGlobalContentTypeId";
import { useGetGlobalContentTypes } from "../../hooks/pages/useGetGlobalContentTypes";
import { useTranslation } from "../../hooks/useTranslation";
import { GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS } from "../../utilities/constants";

// Routes to /termsAndConditions
export default function TermsAndConditions() {
  const largeDevice = useLargeDeviceUp();
  const { translate } = useTranslation();

  const HeadlineComponent = largeDevice ? Headline : Title;

  const { globalContentTypes, isFetching: isFetchingGlobalContentTypes } = useGetGlobalContentTypes();
  const { id: termsAndConditionsGlobalContentTypeId } = useGetGlobalContentTypeId(
    globalContentTypes,
    GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS
  );
  const { globalContent, isFetching: isFecthingGlobalContent } = useGetGlobalContent(
    termsAndConditionsGlobalContentTypeId
  );

  if (isFetchingGlobalContentTypes || isFecthingGlobalContent) {
    return <GlobalLoading />;
  }

  return (
    <div className="flex-1">
      <Head>
        <title>{translate("termsAndConditions", "metaTitle")}</title>
        <meta name="Description" content={translate("termsAndConditions", "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="mt-8 desktop:mt-12">
        <Container classes="tablet:max-w-tabletHearingContent desktop:max-w-desktopHearingContent">
          <HeadlineComponent type="heavy" classes="mt-10 tablet:mt-16">
            {translate("termsAndConditions", "title")}
          </HeadlineComponent>
          <ReactMarkdown
            source={globalContent!}
            // className markdown is used in custom.css
            className="markdown my-2 tablet:my-4"
          />
        </Container>
      </main>
    </div>
  );
}

export function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {},
    revalidate: 300, // In seconds - Every 5 minute
  };
}

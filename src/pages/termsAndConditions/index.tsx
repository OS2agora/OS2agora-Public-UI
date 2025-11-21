import React from "react";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GlobalLoading } from "../../components/atoms/GlobalLoading";
import { useGetGlobalContent } from "../../hooks/pages/useGetGlobalContent";
import { useGetGlobalContentTypeId } from "../../hooks/pages/useGetGlobalContentTypeId";
import { useGetGlobalContentTypes } from "../../hooks/pages/useGetGlobalContentTypes";
import { useTranslation } from "../../hooks/useTranslation";
import { GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS } from "../../utilities/constants/api";
import { TERMS_AND_CONDITIONS_PAGE } from "../../utilities/constants/pages";
import { GlobalContentBody } from "../../components/molecules/GlobalContentBody";
import { Container } from "../../components/atoms/Container";
import { Headline as HeadlineComponent } from "../../components/atoms/Headline";
import ReactMarkdown from "react-markdown";

// Routes to /termsAndConditions
export default function TermsAndConditions() {
  const { translate } = useTranslation();

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
        <title>{translate(TERMS_AND_CONDITIONS_PAGE, "metaTitle")}</title>
        <meta name="Description" content={translate(TERMS_AND_CONDITIONS_PAGE, "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="mt-8 desktop:mt-12">
        <Container classes="tablet:max-w-tablet-hearing-content desktop:max-w-desktop-hearing-content">
          <HeadlineComponent type="heavy" classes="mt-10 tablet:mt-16">
            {translate(TERMS_AND_CONDITIONS_PAGE, "title")}
          </HeadlineComponent>
          <ReactMarkdown
            source={globalContent!}
            // className markdown is used in custom.css
            className="markdown my-2 tablet:my-4"
          />
        </Container>
      </main>
      <GlobalContentBody title={translate(TERMS_AND_CONDITIONS_PAGE, "title")} globalContent={globalContent} />
    </div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale)),
    },
    revalidate: 300, // In seconds - Every 5 minute
  };
}

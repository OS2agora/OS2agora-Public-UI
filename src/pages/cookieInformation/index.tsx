import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useGetGlobalContentTypes } from "../../hooks/pages/useGetGlobalContentTypes";
import { useGetGlobalContentTypeId } from "../../hooks/pages/useGetGlobalContentTypeId";
import { GLOBALCONTENTTYPE_COOKIE_INFORMATION } from "../../utilities/constants/api";
import { useGetGlobalContent } from "../../hooks/pages/useGetGlobalContent";
import { GlobalLoading } from "../../components/atoms/GlobalLoading";
import Head from "next/head";
import { COOKIE_INFORMATION_PAGE } from "../../utilities/constants/pages";
import { useTranslation } from "../../hooks/useTranslation";
import { GlobalContentBody } from "../../components/molecules/GlobalContentBody";

// Routes to /cookieInformation
export default function CookieInformation() {
  const { translate } = useTranslation();

  const { globalContentTypes, isFetching: isFetchingGlobalContentTypes } = useGetGlobalContentTypes();
  const { id: cookieInformationGlobalContentTypeId } = useGetGlobalContentTypeId(
    globalContentTypes,
    GLOBALCONTENTTYPE_COOKIE_INFORMATION
  );
  const { globalContent, isFetching: isFecthingGlobalContent } = useGetGlobalContent(
    cookieInformationGlobalContentTypeId
  );

  if (isFetchingGlobalContentTypes || isFecthingGlobalContent) {
    return <GlobalLoading />;
  }
  return (
    <div className="flex-1">
      <Head>
        <title>{translate(COOKIE_INFORMATION_PAGE, "metaTitle")}</title>
        <meta name="Description" content={translate(COOKIE_INFORMATION_PAGE, "metaDescription")}></meta>
        <link rel="icon" href="/logo.svg" />
      </Head>

      <GlobalContentBody title={translate(COOKIE_INFORMATION_PAGE, "title")} globalContent={globalContent} />
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

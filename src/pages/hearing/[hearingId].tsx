import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useTranslation } from "../../hooks/useTranslation";
import { RenderHearing } from "../../components/renderHearing/RenderHearing";
import { callApi } from "../../utilities/apiClient";
import { fetchHearing } from "../../hooks/api/useHearing";
import { useGetHearing } from "../../hooks/pages/useGetHearing";
import { GlobalLoading } from "../../components/atoms/GlobalLoading";
import { NoAccess } from "../../components/renderHearing/NoAccess";
import { useGetComments } from "../../hooks/pages/useGetComments";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { fetchSubjectAreas } from "../../hooks/api/useSubjectAreas";
import { HEARING_PAGE } from "../../utilities/constants/pages";
import React from "react";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { fetchCityAreas } from "../../hooks/api/useCityAreas";
import { readEnvironmentVariable } from "../../utilities/environmentHelper";
import { useValidateResponseLimit } from "../../hooks/pages/useValidateResponseLimit";
import { HEARING_COMMENTS_ROUTE, HEARING_ANSWER_ROUTE, ACCESS_DENIED_ROUTE } from "../../utilities/constants/routes";
import { ENV_VARIABLE } from "../../utilities/constants/environmentVariables";

// Routes to '/hearing/{hearingId}'
export default function Hearing() {
  const router = useRouter();
  const { translate, translateWithReplace } = useTranslation();
  const hearingId = router.query.hearingId as string;

  const appContext = useAppConfigContext();
  const { pagination, doLogin, setLoginSettings } = appContext;

  const { hearing, isFetching: isFetchingHearing, shouldRedirect, noAccess, isHearingOwner } = useGetHearing(hearingId);
  const { comments: commentsData, isFetching: isFecthingComments } = useGetComments(!noAccess, hearingId, null);

  const { responseLimitHit } = useValidateResponseLimit(!noAccess, isHearingOwner, hearingId);

  if (isFetchingHearing || isFecthingComments) {
    return <GlobalLoading />;
  }

  if (shouldRedirect) {
    router.replace({
      pathname: ACCESS_DENIED_ROUTE,
      query: { redirectUri: window.location.href },
    });
  }

  if (noAccess) {
    return <NoAccess title={translate(HEARING_PAGE, "noAccessTitle")} text={translate(HEARING_PAGE, "noAccessText")} />;
  }

  if (typeof hearing === "undefined") {
    return <GlobalLoading />;
  }

  function routeToCommentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    router.push({
      pathname: HEARING_COMMENTS_ROUTE,
      query: pagination.comments.enabled ? { hearingId, Page: 1 } : { hearingId },
    });
  }

  const openLoginModal = () =>
    setLoginSettings({
      showLoginModal: true,
      redirectUri: `${window.location.origin}${router.asPath}/answer`,
    });

  function routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, doLoginFlow = false) {
    event.preventDefault();

    if (doLoginFlow) {
      openLoginModal();
    } else {
      const query: { hearingId: string } = { hearingId };
      router.push({
        pathname: HEARING_ANSWER_ROUTE,
        query,
      });
    }
  }

  return (
    <div className="flex-1">
      <Head>
        <title>{translateWithReplace(HEARING_PAGE, "metaTitle", "##hearing##", hearing.title!)}</title>
        <meta
          name="Description"
          content={translateWithReplace(HEARING_PAGE, "metaDescription", "##hearing##", hearing.title!)}
        ></meta>
      </Head>
      <RenderHearing
        hearing={hearing}
        comments={commentsData}
        showResponseLimitWarning={responseLimitHit}
        routeToAnswerPage={routeToAnswerPage}
        routeToCommentPage={routeToCommentPage}
      />
    </div>
  );
}

export function getStaticPaths(context: GetStaticPathsContext) {
  // Requires an API we do not have access to build-time
  // We will fix this run-time
  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient();
  const hearingId = context.params?.hearingId as string | undefined;

  if (hearingId === undefined) {
    return {
      props: {
        ...(await serverSideTranslations(context.locale!)),
      },
    };
  }

  const preftechTimeout = parseInt(readEnvironmentVariable(ENV_VARIABLE.PREFETCH_TIMEOUT) || "-1");

  await queryClient.prefetchQuery(["hearing", hearingId], () =>
    callApi(fetchHearing(hearingId), true, preftechTimeout)
  );
  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true, preftechTimeout));
  await queryClient.prefetchQuery(["subjectAreas"], () => callApi(fetchSubjectAreas(), true, preftechTimeout));
  await queryClient.prefetchQuery(["cityAreas"], () => callApi(fetchCityAreas(), true, preftechTimeout));

  return {
    props: {
      ...(await serverSideTranslations(context.locale!)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 300, // In seconds - Every 5 minute
  };
}

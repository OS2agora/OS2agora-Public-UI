import * as React from "react";

import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

import { useTranslation } from "../../hooks/useTranslation";
import { RenderHearing } from "../../components/renderHearing/RenderHearing";
import { callApi } from "../../utilities/apiClient";
import { fetchHearing } from "../../hooks/api/useHearing";
import { useGetHearing } from "../../hooks/pages/useGethearing";
import { GlobalLoading } from "../../components/atoms/GlobalLoading";
import { NoAccess } from "../../components/renderHearing/NoAccess";
import { useGetComments } from "../../hooks/pages/useGetComments";
import { fetchHearingTemplates } from "../../hooks/api/useHearingTemplates";
import { fetchSubjectAreas } from "../../hooks/api/useSubjectAreas";

// Routes to '/hearing/{hearingId}'
export default function Hearing() {
  const router = useRouter();
  const { translate, translateWithReplace } = useTranslation();
  const hearingId = router.query.hearingId as string;

  const { hearing, isFetching: isFetchingHearing, shouldRedirect, noAccess } = useGetHearing(hearingId);
  const { comments: commentsData, isFetching: isFecthingComments } = useGetComments(!noAccess, hearingId);

  if (isFetchingHearing || isFecthingComments) {
    return <GlobalLoading />;
  }

  if (shouldRedirect) {
    router.replace({
      pathname: "/accessdenied",
      query: { redirectUri: window.location.href },
    });
  }

  if (noAccess) {
    return <NoAccess title={translate("hearing", "noAccessTitle")} text={translate("hearing", "noAccessText")} />;
  }

  if (typeof hearing === "undefined") {
    return <GlobalLoading />;
  }

  function routeToCommentPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    router.push({
      pathname: "/hearing/[hearingId]/comments",
      query: { hearingId },
    });
  }

  function routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, doLogin = false) {
    event.preventDefault();
    const query: { hearingId: string; doLogin?: boolean } = { hearingId };
    if (doLogin) {
      query.doLogin = doLogin;
    }
    router.push({
      pathname: "/hearing/[hearingId]/answer",
      query,
    });
  }

  function routeToLoginAndThenAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return routeToAnswerPage(event, true);
  }

  return (
    <div className="flex-1">
      <Head>
        <title>{translateWithReplace("hearing", "metaTitle", "##hearing##", hearing.title!)}</title>
        <meta
          name="Description"
          content={translateWithReplace("hearing", "metaDescription", "##hearing##", hearing.title!)}
        ></meta>
      </Head>
      <RenderHearing
        hearing={hearing}
        comments={commentsData}
        routeToAnswerPage={routeToAnswerPage}
        routeToCommentPage={routeToCommentPage}
        routeToLoginAndThenAnswerPage={routeToLoginAndThenAnswerPage}
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
    return;
  }

  await queryClient.prefetchQuery(["hearing", hearingId], () => callApi(fetchHearing(hearingId), true));
  await queryClient.prefetchQuery(["hearingTemplates"], () => callApi(fetchHearingTemplates(), true));
  await queryClient.prefetchQuery(["subjectAreas"], () => callApi(fetchSubjectAreas(), true));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 300, // In seconds - Every 5 minute
  };
}

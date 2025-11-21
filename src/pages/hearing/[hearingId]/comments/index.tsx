import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GlobalLoading } from "../../../../components/atoms/GlobalLoading";

import { Comments as CommentComponent } from "../../../../components/pages/Comments";
import { useDeleteComment } from "../../../../hooks/api/useDeleteComment";
import { fetchComments } from "../../../../hooks/api/useComments";
import { fetchHearing } from "../../../../hooks/api/useHearing";
import { useTranslation } from "../../../../hooks/useTranslation";
import { callApi } from "../../../../utilities/apiClient";
import { HearingComment } from "../../../../utilities/apiHelper";
import { useGetHearing } from "../../../../hooks/pages/useGetHearing";
import { useGetComments } from "../../../../hooks/pages/useGetComments";
import { NoAccess } from "../../../../components/renderHearing/NoAccess";
import React from "react";
import { usePagination } from "../../../../hooks/usePagination";
import { PaginatedItems } from "../../../../utilities/constants/paginatedItems";
import { getPageSize, getPaginationEnabled } from "../../../../utilities/paginationHelper";
import { useAppConfigContext } from "../../../../hooks/useAppConfig";
import { confirmCommentDelete } from "../../../../utilities/globalMessage";
import { USER_CAPACITY_CITIZEN } from "../../../../utilities/constants/api";
import { readEnvironmentVariable } from "../../../../utilities/environmentHelper";
import { useValidateResponseLimit } from "../../../../hooks/pages/useValidateResponseLimit";
import { ACCESS_DENIED_ROUTE, HEARING_ROUTE, HEARING_ANSWER_ROUTE } from "../../../../utilities/constants/routes";
import { ENV_VARIABLE } from "../../../../utilities/constants/environmentVariables";

// Routes to '/hearing/{hearingId}/comments'
export default function Comments() {
  const router = useRouter();
  const { translate } = useTranslation();
  const pagination = usePagination(PaginatedItems.COMMENTS);
  const appConfig = useAppConfigContext();
  const hearingId = router.query.hearingId as string;

  const { hearing, isFetching: isFetchingHearing, shouldRedirect, noAccess, isHearingOwner } = useGetHearing(hearingId);

  const { comments: commentsData, isFetching: isFecthingComments } = useGetComments(!noAccess, hearingId, pagination);

  const { responseLimitHit } = useValidateResponseLimit(!noAccess, isHearingOwner, hearingId);

  const { mutate: deleteComment, isLoading: isDeleteCommentLoading } = useDeleteComment();

  if (isDeleteCommentLoading || isFetchingHearing || isFecthingComments) {
    return <GlobalLoading />;
  }

  if (shouldRedirect) {
    router.replace({
      pathname: ACCESS_DENIED_ROUTE,
      query: { redirectUri: window.location.href },
    });
  }

  if (noAccess) {
    return <NoAccess title={translate("comments", "noAccessTitle")} text={translate("comments", "noAccessText")} />;
  }

  if (typeof hearing === "undefined") {
    return <GlobalLoading />;
  }

  function routeToHearingPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    router.push({
      pathname: HEARING_ROUTE,
      query: { hearingId },
    });
  }

  function routeToAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, doLoginFlow = false) {
    event.preventDefault();

    if (doLoginFlow) {
      const redirectUri = `${window.location.origin}${router.asPath.replace("comments", "answer")}`;
      appConfig?.doLogin(redirectUri, USER_CAPACITY_CITIZEN);
    } else {
      const query: { hearingId: string } = { hearingId };
      router.push({
        pathname: HEARING_ANSWER_ROUTE,
        query,
      });
    }
  }

  function routeToLoginAndThenAnswerPage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    return routeToAnswerPage(event, true);
  }

  function onDeleteComment(comment: HearingComment) {
    confirmCommentDelete(appConfig, translate, () => deleteComment({ commentId: comment.commentId, hearingId }));
  }

  function onEditComment(comment: HearingComment) {
    router.push({
      pathname: HEARING_ANSWER_ROUTE,
      query: { hearingId, editComment: comment.commentId },
    });
  }

  return (
    <CommentComponent
      hearing={hearing}
      hearingComments={commentsData}
      routeToHearingPage={routeToHearingPage}
      routeToAnswerPage={routeToAnswerPage}
      routeToLoginAndThenAnswerPage={routeToLoginAndThenAnswerPage}
      deleteComment={onDeleteComment}
      editComment={onEditComment}
      pagination={pagination}
      showResponseLimitWarning={responseLimitHit}
    />
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

  const paginationEnabled = getPaginationEnabled(PaginatedItems.COMMENTS);
  const pageSize = getPageSize(PaginatedItems.COMMENTS);

  let params = null as any;

  if (paginationEnabled) {
    params = {
      include: "Contents,Contents.ContentType",
      PageIndex: 1,
      PageSize: pageSize,
    };
  }

  const preftechTimeout = parseInt(readEnvironmentVariable(ENV_VARIABLE.PREFETCH_TIMEOUT) || "-1");

  await queryClient.prefetchQuery(["comments", hearingId], () =>
    callApi(fetchComments(hearingId, params), true, preftechTimeout)
  );
  await queryClient.prefetchQuery(["hearing", hearingId], () =>
    callApi(fetchHearing(hearingId), true, preftechTimeout)
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale!)),
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 300, // In seconds - Every 5 minutes
  };
}

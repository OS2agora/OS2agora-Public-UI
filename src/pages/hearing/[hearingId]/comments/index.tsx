import { GetStaticPathsContext, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { GlobalLoading } from "../../../../components/atoms/GlobalLoading";

import { Comments as CommentComponent } from "../../../../components/pages/Comments";
import { useDeleteComment } from "../../../../hooks/api/useDeleteComment";
import { fetchComments } from "../../../../hooks/api/useComments";
import { fetchHearing } from "../../../../hooks/api/useHearing";
import { useTranslation } from "../../../../hooks/useTranslation";
import { callApi } from "../../../../utilities/apiClient";
import { HearingComment } from "../../../../utilities/apiHelper";
import { useGetHearing } from "../../../../hooks/pages/useGethearing";
import { useGetComments } from "../../../../hooks/pages/useGetComments";
import { NoAccess } from "../../../../components/renderHearing/NoAccess";
import React from "react";

// Routes to '/hearing/{hearingId}/comments'
export default function Comments() {
  const router = useRouter();
  const { translate } = useTranslation();
  const hearingId = router.query.hearingId as string;

  const { hearing, isFetching: isFetchingHearing, shouldRedirect, noAccess } = useGetHearing(hearingId);

  const { comments: commentsData, isFetching: isFecthingComments } = useGetComments(!noAccess, hearingId);

  const { mutate: deleteComment, isLoading: isDeleteCommentLoading } = useDeleteComment();

  if (isDeleteCommentLoading || isFetchingHearing || isFecthingComments) {
    return <GlobalLoading />;
  }

  if (shouldRedirect) {
    router.replace({
      pathname: "/accessdenied",
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
      pathname: "/hearing/[hearingId]",
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

  function onDeleteComment(comment: HearingComment) {
    deleteComment({ commentId: comment.commentId, hearingId });
  }

  function onEditComment(comment: HearingComment) {
    router.push({
      pathname: "/hearing/[hearingId]/answer",
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
    return;
  }

  await queryClient.prefetchQuery(["comments", hearingId], () => callApi(fetchComments(hearingId), true));
  await queryClient.prefetchQuery(["hearing", hearingId], () => callApi(fetchHearing(hearingId), true));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 300, // In seconds - Every 5 minutes
  };
}

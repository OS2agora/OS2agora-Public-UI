import { useRouter } from "next/router";
import * as React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GlobalLoading } from "../../../../components/atoms/GlobalLoading";
import { AnswerHearing, AnswerHearingForm } from "../../../../components/pages/AnswerHearing";
import { NoAccess } from "../../../../components/renderHearing/NoAccess";
import { useCreateComment } from "../../../../hooks/api/useCreateComment";
import { useUpdateComment } from "../../../../hooks/api/useUpdateComment";
import { useGetCommentForm } from "../../../../hooks/pages/useGetCommentForm";
import { useGetComments } from "../../../../hooks/pages/useGetComments";
import { useGetGlobalContent } from "../../../../hooks/pages/useGetGlobalContent";
import { useGetGlobalContentTypeId } from "../../../../hooks/pages/useGetGlobalContentTypeId";
import { useGetGlobalContentTypes } from "../../../../hooks/pages/useGetGlobalContentTypes";
import { useGetHearing } from "../../../../hooks/pages/useGetHearing";
import useIsAuthorized from "../../../../hooks/useIsAuthorized";
import { useTranslation } from "../../../../hooks/useTranslation";
import { buildCreateCommentDto, canCommentOnHearing, buildUpdateCommentDto } from "../../../../utilities/apiHelper";
import { GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS } from "../../../../utilities/constants/api";
import { isServer } from "../../../../utilities/isServer";
import { PageLoading } from "../../../../components/atoms/PageLoading";
import useIsAppLoading from "../../../../hooks/useIsAppLoading";
import { GetStaticPathsContext } from "next";
import { useValidateResponseLimit } from "../../../../hooks/pages/useValidateResponseLimit";
import { GlobalLoadingOverlay } from "../../../../components/molecules/GlobalLoadingOverlay";
import { ACCESS_DENIED_ROUTE } from "../../../../utilities/constants/routes";

// Routes to '/hearing/{hearingId}/answer'
export default function Answer() {
  const { translate } = useTranslation();
  const router = useRouter();
  const hearingId = router.query.hearingId as string;
  const editCommentId = router.query.editComment as string | undefined;

  const isAuthorized = useIsAuthorized();
  const isAppLoading = useIsAppLoading();

  const { hearing, isFetching: isFecthingHearing, shouldRedirect, noAccess, isHearingOwner } = useGetHearing(hearingId);

  const { responseLimitHit } = useValidateResponseLimit(!noAccess, isHearingOwner, hearingId);

  const { globalContentTypes, isFetching: isFetchingGlobalContentTypes } = useGetGlobalContentTypes();

  const { id: termsAndConditionsGlobalContentTypeId } = useGetGlobalContentTypeId(
    globalContentTypes,
    GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS
  );

  const { globalContent, isFetching: isFecthingGlobalContent } = useGetGlobalContent(
    termsAndConditionsGlobalContentTypeId
  );

  const { comments, isFetching: isFecthingComments, entitySet: commentsEntitySet } = useGetComments(
    !noAccess,
    hearingId,
    null
  );

  const { commentForm } = useGetCommentForm(editCommentId, isFecthingComments, comments, commentsEntitySet);

  const { mutate: createComment, isLoading: isCreateCommentLoading } = useCreateComment();

  const { mutate: updateComment, isLoading: isUpdateCommentLoading } = useUpdateComment();
  if (isFecthingHearing || isFecthingComments || isFetchingGlobalContentTypes || isFecthingGlobalContent) {
    return <GlobalLoading />;
  }

  if (!isAppLoading && shouldRedirect) {
    router.replace({
      pathname: ACCESS_DENIED_ROUTE,
      query: { redirectUri: window.location.href },
    });
  }

  if (noAccess) {
    return <NoAccess title={translate("answer", "noAccessTitle")} text={translate("answer", "noAccessText")} />;
  }

  if (typeof hearing === "undefined") {
    return <GlobalLoading />;
  }

  const canCommentOnhearing = canCommentOnHearing(hearing.hearingStatus);

  if (!isAppLoading && !isAuthorized && !isServer) {
    router.replace({
      pathname: ACCESS_DENIED_ROUTE,
      query: { redirectUri: window.location.href },
    });
  }

  if (!canCommentOnhearing) {
    return <NoAccess title={translate("answer", "noAccessTitle")} text={translate("answer", "noAccessText")} />;
  }

  function submit(values: AnswerHearingForm) {
    if (typeof editCommentId !== "undefined") {
      // We are editing an existing comment, and it should be updated!
      const updateCommentDto = buildUpdateCommentDto(values, editCommentId, commentsEntitySet);
      updateComment({
        hearingId,
        commentId: editCommentId,
        comment: updateCommentDto,
      });
    } else {
      const createCommentDto = buildCreateCommentDto(values);
      createComment({ hearingId, comment: createCommentDto });
    }
  }

  return (
    <>
      {isAppLoading ? (
        <PageLoading />
      ) : (
        <>
          <AnswerHearing
            hearing={hearing}
            termsAndCondtions={{ text: globalContent || "" }}
            submit={submit}
            initialComment={commentForm}
            showResponseLimitWarning={responseLimitHit && !editCommentId}
          />
          {/* This loading overlay is used to avoid resetting the state of the page as opposed to GlobalLoading,
             which causes rerender of every child component. */}
          <GlobalLoadingOverlay isLoading={isCreateCommentLoading || isUpdateCommentLoading} />
        </>
      )}
    </>
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

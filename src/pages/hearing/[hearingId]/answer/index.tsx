import { useRouter } from "next/router";
import * as React from "react";
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
import { useGetHearing } from "../../../../hooks/pages/useGethearing";
import useIsAuthorized from "../../../../hooks/useIsAuthorized";
import { useTranslation } from "../../../../hooks/useTranslation";
import { buildCreateCommentDto, canCommentOnHearing, buildUpdateCommentDto } from "../../../../utilities/apiHelper";
import { GLOBALCONTENTTYPE_TERMS_AND_CONDITIONS } from "../../../../utilities/constants";
import { isServer } from "../../../../utilities/isServer";
import { PageLoading } from "../../../../components/atoms/PageLoading";
import useIsAppLoading from "../../../../hooks/useIsAppLoading";
import { useAppConfigContext } from "../../../../hooks/useAppConfig";

// Routes to '/hearing/{hearingId}/answer'
export default function Answer() {
  const { translate } = useTranslation();
  const router = useRouter();
  const hearingId = router.query.hearingId as string;
  const doLoginQueryParam = router.query.doLogin as string;
  const doLogin = typeof doLoginQueryParam === "string" && doLoginQueryParam.toLocaleLowerCase() === "true";
  const editCommentId = router.query.editComment as string | undefined;
  const appConfig = useAppConfigContext();

  const isAuthorized = useIsAuthorized();
  const isAppLoading = useIsAppLoading();

  const { hearing, isFetching: isFecthingHearing, shouldRedirect, noAccess } = useGetHearing(hearingId);

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
    hearingId
  );

  const { commentForm } = useGetCommentForm(editCommentId, isFecthingComments, comments, commentsEntitySet);

  const { mutate: createComment, isLoading: isCreateCommentLoading } = useCreateComment();

  const { mutate: updateComment, isLoading: isUpdateCommentLoading } = useUpdateComment();
  if (
    isFecthingHearing ||
    isFecthingComments ||
    isFetchingGlobalContentTypes ||
    isFecthingGlobalContent ||
    isCreateCommentLoading ||
    isUpdateCommentLoading
  ) {
    return <GlobalLoading />;
  }

  if (!isAppLoading) {
    if (doLogin && !isAuthorized && !isServer) {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
      params.delete("doLogin");
      url.search = params.toString();
      appConfig?.doLogin(url.toString());
    } else if (shouldRedirect) {
      router.replace({
        pathname: "/accessdenied",
        query: { redirectUri: window.location.href },
      });
    }
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
      pathname: "/accessdenied",
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
        <AnswerHearing
          hearing={hearing}
          termsAndCondtions={{ text: globalContent }}
          submit={submit}
          initialComment={commentForm}
        />
      )}
    </>
  );
}

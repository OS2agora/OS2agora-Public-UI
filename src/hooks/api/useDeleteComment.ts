import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ApiClient } from "../../utilities/apiClient";
import { commentDeleted, commentError } from "../../utilities/globalMessage";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";
import { HEARING_COMMENTS_ROUTE } from "../../utilities/constants/routes";

type DeleteCommentProps = {
  hearingId: string;
  commentId: string;
};

async function deleteComment(hearingId: string, commentId: string) {
  const { apiClient } = new ApiClient();
  const { data } = await apiClient.patch(`hearing/${hearingId}/comment/${commentId}`);
  return data;
}

function useDeleteComment() {
  const appContext = useAppConfigContext();
  const { translate } = useTranslation();
  const router = useRouter();

  return useMutation((values: DeleteCommentProps) => deleteComment(values.hearingId, values.commentId), {
    onSuccess: (_, variables) => {
      commentDeleted(appContext!, translate, () =>
        router.push({
          pathname: HEARING_COMMENTS_ROUTE,
          query: { hearingId: variables.hearingId },
        })
      );
    },
    onError: (error: any) => {
      commentError(appContext!, translate, () => console.log("Error when deleting hearing answer!", error));
    },
  });
}

export { useDeleteComment };

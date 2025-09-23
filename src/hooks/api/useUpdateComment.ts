import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ApiClient } from "../../utilities/apiClient";
import { parseApiErrors, UpdateCommentDto } from "../../utilities/apiHelper";
import { commentError, commentUpdated } from "../../utilities/globalMessage";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";

type UpdateCommentProps = {
  hearingId: string;
  commentId: string;
  comment: UpdateCommentDto;
};

async function updateComment(hearingId: string, commentId: string, comment: UpdateCommentDto) {
  const { apiClient } = new ApiClient();

  const bodyFormData = new FormData();

  bodyFormData.append("CommentStatus", String(comment.commentStatus));
  bodyFormData.append("Content", comment.content);
  if (typeof comment.onBehalfOf !== "undefined") {
    bodyFormData.append("OnBehalfOf", comment.onBehalfOf);
  }

  comment.fileOperations.forEach((fileOperation, index) => {
    if (typeof fileOperation.contentId !== "undefined") {
      // We are deleting a file
      bodyFormData.append(`FileOperations[${index}].ContentId`, fileOperation.contentId);
    } else {
      // We are adding a file
      bodyFormData.append(`FileOperations[${index}].File`, fileOperation.file!);
    }
    bodyFormData.append(`FileOperations[${index}].Operation`, String(fileOperation.operation));
  });

  const { data } = await apiClient.patch(`hearing/${hearingId}/comment/${commentId}/content`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

function useUpdateComment() {
  const appContext = useAppConfigContext();
  const { translate } = useTranslation();
  const router = useRouter();

  return useMutation(
    (values: UpdateCommentProps) => updateComment(values.hearingId, values.commentId, values.comment),
    {
      onSuccess: (_, variables) => {
        commentUpdated(appContext!, translate, () =>
          router.push({
            pathname: "/hearing/[hearingId]/comments",
            query: { hearingId: variables.hearingId },
          })
        );
      },
      onError: (error: AxiosError) => {
        const errorsArray = parseApiErrors(error);
        commentError(
          appContext!,
          translate,
          () => console.log("Error when submitting hearing answer!", error),
          errorsArray
        );
      },
    }
  );
}

export { useUpdateComment };

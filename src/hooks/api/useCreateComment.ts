import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { ApiClient } from "../../utilities/apiClient";
import { CreateCommentDto, parseApiErrors } from "../../utilities/apiHelper";
import { commentCreated, commentError } from "../../utilities/globalMessage";
import { useAppConfigContext } from "../useAppConfig";
import { useTranslation } from "../useTranslation";

type CreateCommentProps = {
  hearingId: string;
  comment: CreateCommentDto;
};

async function createComment(hearingId: string, comment: CreateCommentDto) {
  const { apiClient } = new ApiClient();

  const bodyFormData = new FormData();

  bodyFormData.append("CommentType", String(comment.commentType));
  bodyFormData.append("Content", comment.content);
  if (typeof comment.onBehalfOf !== "undefined") {
    bodyFormData.append("OnBehalfOf", comment.onBehalfOf);
  }

  comment.fileOperations.forEach((fileOperation, index) => {
    bodyFormData.append(`FileOperations[${index}].File`, fileOperation.file!);
    bodyFormData.append(`FileOperations[${index}].Operation`, String(fileOperation.operation));
  });

  const { data } = await apiClient.post(`hearing/${hearingId}/comment`, bodyFormData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

function useCreateComment() {
  const appContext = useAppConfigContext();
  const { translate } = useTranslation();
  const router = useRouter();

  return useMutation((values: CreateCommentProps) => createComment(values.hearingId, values.comment), {
    onSuccess: (_, variables) => {
      commentCreated(appContext!, translate, () =>
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
  });
}

export { useCreateComment };

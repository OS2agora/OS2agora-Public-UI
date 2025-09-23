import * as React from "react";
import { AnswerHearingForm } from "../../components/pages/AnswerHearing";
import { EntitySet, HearingComment, buildFormFromComment } from "../../utilities/apiHelper";

const initialCommentForm = {
  conditions: false,
  files: [],
  hearingAnswer: "",
  onBehalfOf: "",
  showOnBehalfOf: false,
};

const useGetCommentForm = (
  commentId: string | undefined,
  isFecthingComments: boolean,
  comments: HearingComment[],
  commentsEntitySet: EntitySet | undefined
) => {
  const [commentForm, setCommentForm] = React.useState<AnswerHearingForm>(initialCommentForm);

  React.useEffect(() => {
    async function asyncWrapper() {
      if (
        typeof commentId !== "undefined" &&
        typeof commentsEntitySet !== "undefined" &&
        !isFecthingComments &&
        comments.length > 0
      ) {
        const localCommentForm = await buildFormFromComment(commentId, commentsEntitySet);
        setCommentForm(localCommentForm);
      }
    }
    asyncWrapper();
  }, [commentId, comments.length, commentsEntitySet, isFecthingComments]);

  return { commentForm };
};

export { useGetCommentForm };

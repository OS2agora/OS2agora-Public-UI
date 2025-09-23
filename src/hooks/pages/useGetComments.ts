import * as React from "react";
import { EntitySet, HearingComment, buildCommentsModel } from "../../utilities/apiHelper";
import { useComments } from "../api/useComments";
import { useAppConfigContext } from "../useAppConfig";

const useGetComments = (canSeeHearing: boolean, hearingId: string) => {
  const appContext = useAppConfigContext();
  const { data: commentsData, isFetching: isFetchingComments, refetch: refetchComments } = useComments(hearingId);
  const [comments, setComments] = React.useState<HearingComment[]>([]);
  const [isFetching, setIsFecthing] = React.useState(true);
  const [entitySet, setEntitySet] = React.useState<EntitySet>();

  React.useEffect(() => {
    const staticPropMode = commentsData?.getStaticPropsMode;
    const isFetchingSomething = isFetchingComments;
    if (appContext?.auth.isAuthorized && staticPropMode && !isFetchingSomething) {
      refetchComments();
    }
  }, [appContext?.auth.isAuthorized, commentsData?.getStaticPropsMode, isFetchingComments, refetchComments]);

  React.useEffect(() => {
    if (
      !canSeeHearing ||
      typeof hearingId === "undefined" ||
      typeof commentsData === "undefined" ||
      commentsData?.isDataEmpty
    ) {
      setComments([]);
    } else {
      const commentsEntitySet = new EntitySet(commentsData.data);
      const localComments = buildCommentsModel(appContext?.auth.me.identifier, commentsEntitySet);
      setComments(localComments);
      setEntitySet(commentsEntitySet);
    }
  }, [appContext?.auth.me.identifier, canSeeHearing, commentsData, hearingId]);

  React.useEffect(() => {
    const noData = !commentsData;
    const isAuthorizing = (appContext?.auth.isAuthorizing ?? true) || !(appContext?.app.isReady ?? false);
    const staticPropMode = commentsData?.getStaticPropsMode;
    const isFetchingSomething = isFetchingComments;
    setIsFecthing(
      noData || isAuthorizing || ((!!staticPropMode || isFetchingSomething) && (appContext?.auth.isAuthorized ?? true))
    );
  }, [
    appContext?.app.isReady,
    appContext?.auth.isAuthorized,
    appContext?.auth.isAuthorizing,
    commentsData,
    isFetchingComments,
  ]);

  return { comments, isFetching, entitySet };
};

export { useGetComments };

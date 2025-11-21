import React, { useEffect, useState } from "react";
import { useGetComments } from "./useGetComments";
import { readEnvironmentVariable } from "../../utilities/environmentHelper";
import { ENV_VARIABLE } from "../../utilities/constants/environmentVariables";

interface IValidateResponseLimit {
  responseLimitHit: boolean;
}

const useValidateResponseLimit = (
  canSeeHearing: boolean,
  isHearingOwner: boolean,
  hearingId: string
): IValidateResponseLimit => {
  const [responseLimitHit, setResponseLimitHit] = useState<boolean>(false);
  const [maxResponseCount, setMaxResponseCount] = useState<number>(-1);
  const [maxHearingOwnerResponseCount, setMaxHearingOwnerResponseCount] = useState<number>(-1);

  const { comments: myCommentsData, isFetching: isFecthingMyComments } = useGetComments(
    canSeeHearing,
    hearingId,
    null,
    true
  );

  const initializeMaxResponseCount = (): void => {
    const responseCountEnv = readEnvironmentVariable(ENV_VARIABLE.RESPONSE_LIMIT);
    const hearingOwnerResponseCountEnv = readEnvironmentVariable(ENV_VARIABLE.HEARINGOWNER_RESPONSE_LIMIT);

    if (responseCountEnv) {
      setMaxResponseCount(parseInt(responseCountEnv));
    }
    if (hearingOwnerResponseCountEnv) {
      setMaxHearingOwnerResponseCount(parseInt(hearingOwnerResponseCountEnv));
    }
  };

  const validateResponseLimit = (): void => {
    if (isHearingOwner && maxHearingOwnerResponseCount > 0) {
      const isLimitHit = myCommentsData.length >= maxHearingOwnerResponseCount;
      setResponseLimitHit(isLimitHit);
    } else if (maxResponseCount > 0) {
      const isLimitHit = myCommentsData.length >= maxResponseCount;
      setResponseLimitHit(isLimitHit);
    } else {
      setResponseLimitHit(false);
    }
  };

  useEffect(() => {
    initializeMaxResponseCount();
  }, []);

  useEffect(() => {
    validateResponseLimit();
  }, [myCommentsData, isFecthingMyComments, isHearingOwner, hearingId]);

  return {
    responseLimitHit,
  };
};

export { useValidateResponseLimit };

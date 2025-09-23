import { getRefreshToken } from "../hooks/api/useRefreshToken";
import { renewAccessToken } from "../hooks/api/useRenewAccessToken";

const startRefreshTokenFlow = async () => {
  const { token, accessTokenExpirationDate } = await getRefreshToken();

  const currentDate = new Date();
  const expirationDate = new Date(accessTokenExpirationDate);
  const timeUntillExpiration = expirationDate.getTime() - currentDate.getTime();

  if (timeUntillExpiration <= 0) {
    return;
  }

  setTimeout(async () => {
    await renewAccessToken(token);
    startRefreshTokenFlow();
  }, timeUntillExpiration);
};

export { startRefreshTokenFlow };

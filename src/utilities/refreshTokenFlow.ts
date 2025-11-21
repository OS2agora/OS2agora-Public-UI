import { AppConfigContextInterface } from "../contexts/AppConfig";
import { getRefreshToken } from "../hooks/api/useRefreshToken";
import { renewAccessToken } from "../hooks/api/useRenewAccessToken";
import { failedSessionRefresh, sessionExpired } from "./globalMessage";

const startRefreshTokenFlow = async (
  appContext: AppConfigContextInterface,
  translate: (page: string, key: string) => string,
  onFailedSessionRefresh: () => void
) => {
  const { token, accessTokenExpirationDate, refreshTokenExpirationDate } = await getRefreshToken();

  const currentDate = new Date();
  const accTokenExpDate = new Date(accessTokenExpirationDate);
  const refreshTokenExpDate = new Date(refreshTokenExpirationDate);
  const timeToAccessTokenExpiration = accTokenExpDate.getTime() - currentDate.getTime();
  const timeToRefreshTokenExpiration = refreshTokenExpDate.getTime() - currentDate.getTime();
  const refreshTokenExpired = timeToRefreshTokenExpiration < 0;

  if (!refreshTokenExpired) {
    const failedRefreshId = setTimeout(onFailedSessionRefresh, timeToRefreshTokenExpiration);

    const onRenewAccessToken = async () => {
      clearTimeout(failedRefreshId);
      try {
        await renewAccessToken(token);
        startRefreshTokenFlow(appContext, translate, onFailedSessionRefresh);
      } catch {
        failedSessionRefresh(appContext, translate, onFailedSessionRefresh);
      }
    };

    setTimeout(() => {
      sessionExpired(appContext, translate, onRenewAccessToken);
    }, timeToAccessTokenExpiration);
  } else {
    onFailedSessionRefresh();
  }
};

export { startRefreshTokenFlow };

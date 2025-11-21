import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const CONSENT_COOKIE_NAME = "hp.public.cookie.consent";
const CONSENT_COOKIE_VALUE = "did_consent";
const DEFAULT_EXPIRATION_IN_DAYS = 100;
const COOKIE_SAME_SITE_OPTION = "Strict";

const useCookieConsent = () => {
  const [didConsent, setDidConsent] = useState<boolean>(false);

  const getCookie = (): string | undefined => {
    const cookie = Cookies.get()?.[CONSENT_COOKIE_NAME];
    return cookie;
  };

  const setConsentCookie = (): void => {
    const cookieSecurity = window.location ? window.location.protocol === "https:" : true;

    const cookieOptions = {
      secure: cookieSecurity,
      sameSite: COOKIE_SAME_SITE_OPTION as "Strict",
      expires: DEFAULT_EXPIRATION_IN_DAYS,
    };

    Cookies.set(CONSENT_COOKIE_NAME, CONSENT_COOKIE_VALUE, cookieOptions);
  };

  useEffect(() => {
    const cookie = getCookie();
    if (cookie === CONSENT_COOKIE_VALUE) {
      setDidConsent(true);
    } else {
      setDidConsent(false);
    }
  }, []);

  const onConsent = () => {
    setDidConsent(true);
    setConsentCookie();
  };

  return {
    didConsent,
    onConsent,
  };
};

export { useCookieConsent };

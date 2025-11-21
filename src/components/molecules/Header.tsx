import React from "react";

import NextLink from "next/link";
import clsx from "clsx";

import { SubHeader } from "../atoms/SubHeader";
import { UserCircle } from "../atoms/UserCircle";
import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Container } from "../atoms/Container";
import { useAppConfigContext } from "../../hooks/useAppConfig";
import { getInitialsFromMe } from "../../utilities/stringHelper";
import { Card } from "../atoms/Card";
import { Body } from "../atoms/Body";
import { Divider } from "../atoms/Divider";
import { ImageRenderer } from "../atoms/ImageRenderer";
import { UserInfo } from "./UserInfo";

type ImageProps = {
  src: string | undefined;
  alt: string;
};

type HeaderProps = {
  classes?: string;
  preTitle: string;
  title: string;
  loginText: string;
  logoutText: string;
  myHearingsText: string;
  loggedOnBehalfOfText: string;
  image: ImageProps;
};

const styling = {
  root: "bg-white w-full shadow z-5",
  container: "flex justify-between items-center h-16 tablet:h-20 desktop:h-24 relative",
  userContainer: "",
  text: "text-grey-dark",
  link: "cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
  image: "object-contain h-10 tablet:h-14 desktop:h-18 relative",
  loginText: "text-blue-center cursor-pointer focus:outline-hidden focus:border-transparent hover:text-blue-grey",
  dropdown:
    "bg-white p-4 pr-8 rounded-b absolute top-16 tablet:top-20 desktop:top-24 right-5 tablet:right-6.5 desktop:right-25 min-w-max",
  dropdownText: "mb-2 mt-2 block",
  dropdownLink:
    "cursor-pointer text-blue-center mt-2 mb-2 block focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
  myHearingsLinks:
    "cursor-pointer text-blue-center mt-2 focus:outline-hidden focus:ring-2 focus:ring-green-current-hearing focus:border-transparent",
};

const Header = ({
  classes,
  image,
  title,
  preTitle,
  loginText,
  logoutText,
  myHearingsText,
  loggedOnBehalfOfText,
  ...rest
}: HeaderProps) => {
  const appConfig = useAppConfigContext();
  const { setLoginSettings, loading } = appConfig;
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const className = clsx(styling.root, classes);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const imageHeight = smallDevice ? 33 : largeDevice ? 60 : 53;
  const imageWidth = smallDevice ? 75 : largeDevice ? 136 : 120;

  let shouldShowUserCircle = false;
  let initials = "";
  if (appConfig?.app.isReady && appConfig.auth.isAuthorized) {
    shouldShowUserCircle = true;
    initials = getInitialsFromMe(appConfig.auth.me)!;
  }

  const openLoginModal = () => (!loading ? setLoginSettings((prev) => ({ ...prev, showLoginModal: true })) : null);

  return (
    <div className={className} role="navigation">
      <Container classes={styling.container} {...rest}>
        <NextLink href="/" className={styling.link}>
          {image.src && (
            <ImageRenderer
              src={image.src}
              alt={image.alt}
              height={imageHeight}
              width={imageWidth}
              classes={styling.image}
            />
          )}
        </NextLink>
        <SubHeader type="heavy" component="span" classes={styling.text}>
          {!smallDevice ? <SubHeader component="span">{preTitle}</SubHeader> : null}
          {title}
        </SubHeader>
        <div className={styling.userContainer}>
          {shouldShowUserCircle && (
            <>
              <UserCircle initials={initials} onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
              {isDropdownOpen && (
                <Card classes={styling.dropdown}>
                  <UserInfo me={appConfig?.auth.me} loggedInOnBehalfOfText={loggedOnBehalfOfText} />
                  <Divider />
                  <Body type="heavy" component="span" classes={styling.dropdownText}>
                    <NextLink href="/myHearings" className={styling.myHearingsLinks}>
                      {myHearingsText}
                    </NextLink>
                  </Body>
                  <Divider />
                  <button
                    onClick={() => appConfig?.doLogout(window.location.href)}
                    onKeyDown={(event) =>
                      event.key === "Enter" ? appConfig?.doLogout(window.location.href) : undefined
                    }
                    className={styling.dropdownLink}
                  >
                    <Body type="heavy" component="span">
                      {logoutText}
                    </Body>
                  </button>
                </Card>
              )}
            </>
          )}
          {!shouldShowUserCircle && (
            <button onClick={openLoginModal} className={styling.loginText}>
              <SubHeader type="heavy" component="span">
                {loginText}
              </SubHeader>
            </button>
          )}
        </div>
      </Container>
    </div>
  );
};

export { Header };
export type { HeaderProps };

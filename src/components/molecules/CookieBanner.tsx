import React from "react";
import clsx from "clsx";
import { Card } from "../atoms/Card";
import { Title } from "../atoms/Title";
import { Body } from "../atoms/Body";
import { NavigationBar } from "../atoms/NavigationBar";
import { Button } from "../atoms/Button";
import { Link } from "../atoms/Link";
import { useTranslation } from "../../hooks/useTranslation";
import { COOKIE_INFORMATION_ROUTE } from "../../utilities/constants/routes";

const styling = {
  root:
    "bg-white p-6 flex flex-col items-start w-full tablet:w-5/6 fixed z-20 bottom-0 tablet:bottom-12 left-1/2 transform -translate-x-1/2 animate-slide-up",
  title: "pb-1 text-left",
  contentContainer: "flex justify-between w-full",
  text: "text-grey-dark inline grow mr-5",
  buttonContainer: "w-40 self-end",
  button: "",
};

type CookieBannerProps = {
  classes?: string;
  show: boolean;
  onAccept: () => void;
};

const CookieBanner = ({ classes, show, onAccept }: CookieBannerProps) => {
  const className = clsx(styling.root, classes);
  const { translate } = useTranslation();

  if (!show) {
    return null;
  }

  return (
    <div role="banner">
      <Card rounded classes={className}>
        <Title type="heavy" classes={styling.title}>
          {translate("global", "cookieBannerHeader")}
        </Title>
        <div className={styling.contentContainer}>
          <Body type="regular" classes={styling.text}>
            {translate("global", "cookieBannerText")}

            {translate("global", "cookieBannerLinkText") ? (
              <Link href={COOKIE_INFORMATION_ROUTE} target="_blank" underline>
                {translate("global", "cookieBannerLinkText")}
              </Link>
            ) : null}
          </Body>
          <NavigationBar fixed={false} classes={styling.buttonContainer}>
            <Button variant="primary" onClick={onAccept} classes={styling.button}>
              {translate("global", "cookieBannerButton")}
            </Button>
          </NavigationBar>
        </div>
      </Card>
    </div>
  );
};

export { CookieBanner };

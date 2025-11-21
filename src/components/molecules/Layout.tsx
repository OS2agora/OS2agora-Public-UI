import clsx from "clsx";

import { Header, HeaderProps } from "./Header";
import { Footer } from "./Footer";
import useBootstrap from "../../hooks/useBootstrap";
import { useQueryClient } from "react-query";
import { GlobalMessage } from "./GlobalMessage";
import Head from "next/head";
import Script from "next/script";
import React from "react";
import { LoginModal, LoginModalProps } from "./LoginModal";

type LinkProps = {
  text: string;
  href: string;
};

type ImageProps = {
  src: string | undefined;
  alt: string;
};

type LayoutProps = {
  classes?: string;
  children: React.ReactNode;
  header: HeaderProps;
  loginModal: LoginModalProps;
  footer: {
    externalLinks: LinkProps[];
    internalLinks: LinkProps[];
    textLines: string[];
    image: ImageProps;
  };
};

const styling = {
  root: "h-screen flex flex-col",
};

const Layout = ({ classes, children, header, loginModal, footer, ...rest }: LayoutProps) => {
  const className = clsx(styling.root, classes);
  const queryClient = useQueryClient();
  const _ = useBootstrap(queryClient);

  return (
    <div className={className} {...rest}>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Script src="/__ENV.js" strategy="beforeInteractive" />
      <Header
        image={{ src: header.image.src, alt: header.image.alt }}
        title={header.title}
        preTitle={header.preTitle}
        loginText={header.loginText}
        logoutText={header.logoutText}
        myHearingsText={header.myHearingsText}
        loggedOnBehalfOfText={header.loggedOnBehalfOfText}
      />
      <GlobalMessage />
      <LoginModal
        title={loginModal.title}
        loginCitizenOrCompanyText={loginModal.loginCitizenOrCompanyText}
        loginEmployeeText={loginModal.loginEmployeeText}
      />
      {children}
      <Footer
        textLines={footer.textLines}
        internalLinks={footer.internalLinks}
        externalLinks={footer.externalLinks}
        image={footer.image}
      />
    </div>
  );
};

export { Layout };

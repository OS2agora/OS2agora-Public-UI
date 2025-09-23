import clsx from "clsx";

import { Header, HeaderProps } from "./Header";
import { Footer } from "./Footer";
import useBootstrap from "../../hooks/useBootstrap";
import { useQueryClient } from "react-query";
import { GlobalMessage } from "./GlobalMessage";
import Head from "next/head";
import React from "react";

type LinkProps = {
  text: string;
  href: string;
};

type ImageProps = {
  src: string;
  alt: string;
};

type LayoutProps = {
  classes?: string;
  children: React.ReactNode;
  header: HeaderProps;
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

const Layout = ({ classes, children, header, footer, ...rest }: LayoutProps) => {
  const className = clsx(styling.root, classes);
  const queryClient = useQueryClient();
  const _ = useBootstrap(queryClient);

  return (
    <div className={className} {...rest}>
      <Head>
        <script src="/__ENV.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        image={{ src: header.image.src, alt: header.image.alt }}
        title={header.title}
        preTitle={header.preTitle}
        loginText={header.loginText}
        logoutText={header.logoutText}
        loggedOnBehalfOfText={header.loggedOnBehalfOfText}
        myHearingsText={header.myHearingsText}
      />
      <GlobalMessage />
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

import NextLink from "next/link";
import clsx from "clsx";

import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Body } from "../atoms/Body";
import { Container } from "../atoms/Container";
import { Divider } from "../atoms/Divider";
import { Link } from "../atoms/Link";
import { Small } from "../atoms/Small";
import { SubHeader } from "../atoms/SubHeader";
import { ImageRenderer } from "../atoms/ImageRenderer";

type ClassesProps = {
  classes?: string;
};

const DividerSection = ({ classes }: ClassesProps) => {
  const smallDevice = useMediumDeviceDown();
  if (smallDevice) {
    return <Divider classes={classes} />;
  }
  return null;
};

type LinkProps = {
  text: string;
  href: string;
};

type LinkSectionProps = {
  classes?: string;
  links: LinkProps[];
};

const InternalLinkSection = ({ classes, links }: LinkSectionProps) => {
  const smallDevice = useMediumDeviceDown();
  const textSpace = smallDevice ? "" : "pb-1";
  const Component = smallDevice ? Body : SubHeader;

  return (
    <div className={classes}>
      {links.map((link, index) => {
        return (
          <Component classes={index === 0 ? textSpace : ""} type="regular" key={index}>
            <NextLink href={link.href}>
              <a
                href={link.href}
                className="focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent"
              >
                {link.text}
              </a>
            </NextLink>
          </Component>
        );
      })}
    </div>
  );
};

const ExternalLinksSection = ({ classes, links }: LinkSectionProps) => {
  const smallDevice = useMediumDeviceDown();
  const textSpace = smallDevice ? "" : "pb-1";

  return (
    <div className={classes}>
      {links.map((link, index) => {
        return (
          <Link href={link.href} classes={`block ${index === 0 ? textSpace : ""}`} underline key={index}>
            {link.text}
          </Link>
        );
      })}
    </div>
  );
};

type InformationSectionProps = {
  classes?: string;
  textLines: string[];
};

const InformationSection = ({ classes, textLines }: InformationSectionProps) => {
  const smallDevice = useMediumDeviceDown();

  const Component = smallDevice ? Small : Body;

  return (
    <div className={classes}>
      {textLines.map((text, index) => {
        return (
          <Component type="regular" key={index}>
            {text}
          </Component>
        );
      })}
    </div>
  );
};

type ImageProps = ClassesProps & {
  src: string;
  alt: string;
};

const Image = ({ classes, src, alt }: ImageProps) => {
  const smallDevice = useMediumDeviceDown();

  const imageHeight = smallDevice ? 70 : 103;
  const imageWidth = smallDevice ? 58 : 85;

  return (
    <NextLink href="/">
      <a
        href="/"
        className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent"
      >
        <ImageRenderer src={src} alt={alt} className={classes} width={imageWidth} height={imageHeight} />
      </a>
    </NextLink>
  );
};

type FooterProps = {
  classes?: string;
  externalLinks: LinkProps[];
  internalLinks: LinkProps[];
  textLines: string[];
  image: ImageProps;
};

const smallDeviceStyling = {
  root: "w-full bg-blue-dark text-white",
  container: "py-6",
  internalLinksSection:
    "pl-4 pb-4 focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent",
  divider: "text-grey-dark",
  linkLogoContainer: "pl-4 pt-4 flex justify-between relative",
  infoContainer: "pt-4",
  image: "absolute right-0 bottom-3",
};

const mediumDeviceStyling = {
  container: "py-10 flex",
  internalLinksSection: "pb-3 focus:outline-none focus:ring-2 focus:ring-green-currentHearing focus:border-transparent",
  linkLogoContainer: "flex justify-between flex-grow",
  infoContainer: "pr-24",
  imageContainer: "flex",
};

const largeDeviceStyling = {
  container: "py-10 flex",
  linkContainer: "flex",
  linkLogoContainer: "flex justify-between flex-grow",
  infoContainer: "pr-24",
  externalLinkContainer: "pr-24",
  imageContainer: "flex",
};

const Footer = ({ classes, externalLinks, internalLinks, textLines, image, ...rest }: FooterProps) => {
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();
  const className = clsx(smallDeviceStyling.root, classes);

  if (smallDevice) {
    return (
      <footer className={className} {...rest} role="contentinfo">
        <Container>
          <div className={smallDeviceStyling.container}>
            <InternalLinkSection links={internalLinks} classes={smallDeviceStyling.internalLinksSection} />
            <DividerSection classes={smallDeviceStyling.divider} />
            <div className={smallDeviceStyling.linkLogoContainer}>
              <div>
                <ExternalLinksSection links={externalLinks} />
                <InformationSection classes={smallDeviceStyling.infoContainer} textLines={textLines} />
              </div>
              <div>
                <Image classes={smallDeviceStyling.image} src={image.src} alt={image.alt} />
              </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  if (!smallDevice && !largeDevice) {
    return (
      <footer className={className} {...rest}>
        <Container>
          <div className={mediumDeviceStyling.container}>
            <InformationSection classes={mediumDeviceStyling.infoContainer} textLines={textLines} />
            <div className={mediumDeviceStyling.linkLogoContainer}>
              <div>
                <InternalLinkSection classes={mediumDeviceStyling.internalLinksSection} links={internalLinks} />
                <ExternalLinksSection links={externalLinks} />
              </div>
              <div className={mediumDeviceStyling.imageContainer}>
                <Image src={image.src} alt={image.alt} />
              </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  if (largeDevice) {
    return (
      <footer className={className} {...rest}>
        <Container>
          <div className={largeDeviceStyling.container}>
            <InformationSection classes={largeDeviceStyling.infoContainer} textLines={textLines} />
            <div className={largeDeviceStyling.linkLogoContainer}>
              <div className={largeDeviceStyling.linkContainer}>
                <ExternalLinksSection classes={largeDeviceStyling.externalLinkContainer} links={externalLinks} />
                <InternalLinkSection links={internalLinks} />
              </div>
              <div className={largeDeviceStyling.imageContainer}>
                <Image src={image.src} alt={image.alt} />
              </div>
            </div>
          </div>
        </Container>
      </footer>
    );
  }
  return null;
};

export { Footer };

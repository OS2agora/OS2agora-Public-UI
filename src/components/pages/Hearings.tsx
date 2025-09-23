import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Container } from "../../components/atoms/Container";
import { Filter } from "../../components/molecules/Filter";
import { HearingCard } from "../../components/molecules/HearingCard";
import { TitleBarWithSearch } from "../../components/molecules/TitleBarWithSearch";
import { HearingOverview } from "../../utilities/apiHelper";
import { SpinnerIcon } from "../icons";
import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Headline } from "../atoms/Headline";
import { Title } from "../atoms/Title";
import { useTranslation } from "../../hooks/useTranslation";
import ReactMarkdown from "react-markdown";

type InputProps = {
  value: string;
  text: string;
};

type HearingsProps = {
  hearings: HearingOverview[];
  isFetching: boolean;
  metaTitle: string;
  metaDescription: string;
  title: string;
  filter: string;
  currentPage: string;
  activeHearingsLabel: string;
  activeHearingsPath: string;
  myHearingsLabel: string;
  myHearingsPath: string;
  archivedHearingsLabel: string;
  archivedHearingsPath: string;
  filterCheckboxLabel: string;
  filterRadioButtonLabel: string;
  filterSubmitText: string;
  filterTitle: string;
  filterCloseButtonLabel: string;
  filterCheckboxOptions: InputProps[];
  searchPlaceholder: string;
  searchLabel: string;
  readCommentsLabel?: string | undefined;
};

const Hearings = ({
  hearings,
  isFetching,
  metaTitle,
  metaDescription,
  title,
  filter,
  currentPage,
  activeHearingsLabel,
  activeHearingsPath,
  myHearingsLabel,
  myHearingsPath,
  archivedHearingsLabel,
  archivedHearingsPath,
  filterCheckboxLabel,
  filterRadioButtonLabel,
  filterSubmitText,
  filterTitle,
  filterCloseButtonLabel,
  filterCheckboxOptions,
  searchPlaceholder,
  searchLabel,
  readCommentsLabel,
}: HearingsProps) => {
  const { translate } = useTranslation();
  const router = useRouter();
  const [isFilterOpen, setIsFilteropen] = React.useState(false);
  const [subjectAreas, setSubjectAreas] = React.useState(router.query.subjectArea);
  const [searchTerm, setSearchTerm] = React.useState(router.query.search);
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();

  const filterBySearchTerm = React.useCallback(
    (hearing: HearingOverview) => {
      const searchTermString = searchTerm as string | undefined;
      if (!searchTermString) {
        return true;
      }

      if (!hearing.title) {
        return false;
      }

      return hearing.title.toLowerCase().includes(searchTermString.toLowerCase());
    },
    [searchTerm]
  );

  const filterHearings = React.useCallback(() => {
    return hearings.filter((hearing) => {
      if (subjectAreas === undefined) {
        return filterBySearchTerm(hearing);
      }

      if (!subjectAreas.includes(hearing.subjectArea)) {
        return false;
      }

      return filterBySearchTerm(hearing);
    });
  }, [filterBySearchTerm, hearings, subjectAreas]);

  const filteredHearings = React.useMemo(() => filterHearings(), [filterHearings]);

  const HeadlineComponent = largeDevice ? Headline : Title;
  const rootCss = smallDevice && isFilterOpen ? "flex-1 overflow-hidden" : "flex-1";

  function handleHearingCardClick(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.preventDefault();
    router.push(`/hearing/${id}`);
  }

  function handleReadCommentsClick(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.preventDefault();
    router.push(`hearing/${id}/comments`);
  }

  function filterSubmit(values: any) {
    const { hearingType, subjectAreas: localSubjectAreas } = values;
    const localCurrentpage = router.pathname.replace("/", "");

    if (hearingType !== localCurrentpage) {
      router.push({
        pathname: hearingType,
        query: { ...router.query, subjectArea: localSubjectAreas },
      });
    }

    if (localSubjectAreas.length > 0) {
      router.push(
        {
          query: { ...router.query, subjectArea: localSubjectAreas },
        },
        undefined,
        {
          shallow: true,
        }
      );
    } else {
      delete router.query.subjectArea;
      router.push(
        {
          query: { ...router.query },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
    setSubjectAreas(localSubjectAreas);
    setIsFilteropen(false);
  }

  function handleSearch(values: { search: string }): void {
    if (values.search === "") {
      delete router.query.search;
      router.push(
        {
          query: { ...router.query },
        },
        undefined,
        {
          shallow: true,
        }
      );
    } else {
      router.push(
        {
          query: { ...router.query, search: values.search },
        },
        undefined,
        { shallow: true }
      );
    }
    setSearchTerm(values.search);
  }

  return (
    <div className={rootCss}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="Description" content={metaDescription}></meta>
      </Head>

      <main className="mt-4 tablet:mt-8 desktop:mt-12">
        <TitleBarWithSearch
          title={title}
          filter={filter}
          onClick={() => setIsFilteropen(!isFilterOpen)}
          onSearch={handleSearch}
          placeholder={searchPlaceholder}
          initialValue={searchTerm as string}
          label={searchLabel}
        />

        <Container classes="mt-10">
          <div className="flex flex-wrap tablet:-mx-6 tablet:space-x-6">
            {isFetching ? (
              <SpinnerIcon className="w-full tablet:w-tabletHearingCard desktop:w-desktopHearingCard self-center animate-spin text-5xl" />
            ) : (
              filteredHearings.map((hearing: HearingOverview, index) => {
                return (
                  <HearingCard
                    onClick={(event) => handleHearingCardClick(event, hearing.id)}
                    onReadCommentsClick={(event) => handleReadCommentsClick(event, hearing.id)}
                    classes={`mb-16 tablet:mb-10 desktop:mb-16 ${index === 0 ? "tablet:ml-6" : ""}`}
                    key={index}
                    shouldShowComments={hearing.shouldShowComments}
                    comments={hearing.numberOfComments}
                    title={hearing.title!}
                    text={hearing.summary!}
                    linkText={hearing.linkText}
                    status={hearing.status}
                    statusText={hearing.statusText}
                    image={hearing.image}
                    imageAlt={hearing.imageAlt}
                    date={{
                      title: hearing.date.title,
                      date: hearing.date.date,
                      month: hearing.date.month,
                    }}
                    archived={hearing.archived}
                    readCommentsLabel={readCommentsLabel}
                  />
                );
              })
            )}
          </div>
          {filteredHearings.length === 0 && !isFetching ? (
            <div>
              <HeadlineComponent type="heavy">{translate(currentPage, "noHearingsTitle")}</HeadlineComponent>
              <ReactMarkdown
                source={translate(currentPage, "noHearingsText")}
                // className markdown is used in custom.css
                className="markdown mt-2 tablet:mt-4"
              />
            </div>
          ) : null}
        </Container>

        <Filter
          checkboxOptions={filterCheckboxOptions}
          onSubmit={(values) => filterSubmit(values)}
          initialRadioButtonOption={currentPage}
          onCloseFilter={() => setIsFilteropen(false)}
          initialCheckboxOptions={
            Array.isArray(subjectAreas) ? subjectAreas : typeof subjectAreas === "undefined" ? [] : [subjectAreas]
          }
          open={isFilterOpen}
          radioButtonOptions={[
            {
              text: activeHearingsLabel,
              value: activeHearingsPath,
            },
            {
              text: myHearingsLabel,
              value: myHearingsPath,
            },
            {
              text: archivedHearingsLabel,
              value: archivedHearingsPath,
            },
          ]}
          texts={{
            checkboxLabel: filterCheckboxLabel,
            radioButtonLabel: filterRadioButtonLabel,
            submitText: filterSubmitText,
            title: filterTitle,
            filterCloseButtonLabel,
          }}
        />
      </main>
    </div>
  );
};

export { Hearings };

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

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
import { Pagination } from "../molecules/Pagination";
import { PaginationProps } from "../../hooks/usePagination";
import { HEARING_ROUTE, HEARING_COMMENTS_ROUTE } from "../../utilities/constants/routes";

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
  activePage: string;
  activeHearingsLabel: string;
  activeHearingsPath: string;
  myHearingsLabel: string;
  myHearingsPath: string;
  archivedHearingsLabel: string;
  archivedHearingsPath: string;
  subjectAreaCheckboxLabel: string;
  cityAreaCheckboxLabel: string;
  filterRadioButtonLabel: string;
  filterSubmitText: string;
  filterTitle: string;
  filterCloseButtonLabel: string;
  subjectAreaCheckboxOptions: InputProps[];
  cityAreaCheckboxOptions: InputProps[];
  searchPlaceholder: string;
  searchLabel: string;
  readCommentsLabel?: string | undefined;
  pagination: PaginationProps;
};

const Hearings = ({
  hearings,
  isFetching,
  metaTitle,
  metaDescription,
  title,
  filter,
  activePage,
  activeHearingsLabel,
  activeHearingsPath,
  myHearingsLabel,
  myHearingsPath,
  archivedHearingsLabel,
  archivedHearingsPath,
  subjectAreaCheckboxLabel,
  cityAreaCheckboxLabel,
  filterRadioButtonLabel,
  filterSubmitText,
  filterTitle,
  filterCloseButtonLabel,
  subjectAreaCheckboxOptions,
  cityAreaCheckboxOptions,
  searchPlaceholder,
  searchLabel,
  readCommentsLabel,
  pagination,
}: HearingsProps) => {
  const { translate } = useTranslation();
  const router = useRouter();
  const [isFilterOpen, setIsFilteropen] = React.useState(false);
  const [subjectAreas, setSubjectAreas] = React.useState(router.query.subjectArea);
  const [cityAreas, setCityAreas] = React.useState(router.query.cityArea);
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
      if (subjectAreas === undefined && cityAreas === undefined) {
        return filterBySearchTerm(hearing);
      }

      if (subjectAreas !== undefined) {
        if (hearing.subjectArea === undefined) {
          return false;
        }

        if (!subjectAreas.includes(hearing.subjectArea)) {
          return false;
        }
      }

      if (cityAreas !== undefined) {
        if (hearing.cityArea === undefined) {
          return false;
        }

        if (!cityAreas.includes(hearing.cityArea)) {
          return false;
        }
      }

      return filterBySearchTerm(hearing);
    });
  }, [filterBySearchTerm, hearings, subjectAreas, cityAreas]);

  const filteredHearings = React.useMemo(() => filterHearings(), [filterHearings]);

  const HeadlineComponent = largeDevice ? Headline : Title;
  const rootCss = smallDevice && isFilterOpen ? "flex-1 overflow-hidden" : "flex-1";

  function handleHearingCardClick(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.preventDefault();
    router.push({
      pathname: HEARING_ROUTE,
      query: { hearingId: id },
    });
  }

  function handleReadCommentsClick(event: React.MouseEvent<HTMLButtonElement>, id: string) {
    event.preventDefault();
    router.push({
      pathname: HEARING_COMMENTS_ROUTE,
      query: { hearingId: id },
    });
  }

  function filterSubmit(values: any) {
    const { hearingType, subjectAreas: localSubjectAreas, cityAreas: localCityAreas } = values;
    const localCurrentpage = router.pathname.replace("/", "");

    if (hearingType !== localCurrentpage) {
      router.push({
        pathname: hearingType,
        query: pagination.enabled
          ? { ...router.query, subjectArea: localSubjectAreas, cityArea: localCityAreas, Page: 1 }
          : { ...router.query, subjectArea: localSubjectAreas, cityArea: localCityAreas },
      });
    }

    const query = { ...router.query };

    if (localSubjectAreas.length > 0) {
      query.subjectArea = localSubjectAreas;
    } else {
      delete query.subjectArea;
    }

    if (localCityAreas.length > 0) {
      query.cityArea = localCityAreas;
    } else {
      delete query.cityArea;
    }

    if (pagination.enabled && (localCityAreas.length > 0 || localSubjectAreas.length > 0)) {
      query.Page = "1";
    }

    router.push(
      {
        query,
      },
      undefined,
      {
        shallow: true,
      }
    );
    setSubjectAreas(localSubjectAreas);
    setCityAreas(localCityAreas);
    setIsFilteropen(false);
  }

  function handleSearch(values: { search: string }): void {
    if (values.search === "") {
      delete router.query.search;
      router.push(
        {
          query: pagination.enabled ? { ...router.query, Page: 1 } : { ...router.query },
        },
        undefined,
        {
          shallow: true,
        }
      );
    } else {
      router.push(
        {
          query: pagination.enabled
            ? { ...router.query, search: values.search, Page: 1 }
            : { ...router.query, search: values.search },
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
          <div className="flex flex-wrap gap-x-6 tablet:gap-x-5 desktop:gap-x-6">
            {isFetching ? (
              <SpinnerIcon className="w-full tablet:w-tablet-hearing-card desktop:w-desktop-hearing-card self-center animate-spin text-5xl" />
            ) : (
              filteredHearings.map((hearing: HearingOverview, index) => {
                return (
                  <HearingCard
                    onClick={(event) => handleHearingCardClick(event, hearing.id)}
                    onReadCommentsClick={(event) => handleReadCommentsClick(event, hearing.id)}
                    classes={`mb-16 tablet:mb-10 desktop:mb-16`}
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
              <HeadlineComponent type="heavy">{translate(activePage, "noHearingsTitle")}</HeadlineComponent>
              <ReactMarkdown
                source={translate(activePage, "noHearingsText")}
                // className markdown is used in custom.css
                className="markdown mt-2 tablet:mt-4"
              />
            </div>
          ) : null}
        </Container>

        {pagination.enabled && filteredHearings.length > 0 && !isFetching ? (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onChangePage={pagination.handleChangePage}
          />
        ) : null}

        <Filter
          subjectAreaOptions={subjectAreaCheckboxOptions}
          cityAreaOptions={cityAreaCheckboxOptions}
          onSubmit={(values) => filterSubmit(values)}
          initialRadioButtonOption={activePage}
          onCloseFilter={() => setIsFilteropen(false)}
          initialSubjectAreas={
            Array.isArray(subjectAreas) ? subjectAreas : typeof subjectAreas === "undefined" ? [] : [subjectAreas]
          }
          initialCityAreas={Array.isArray(cityAreas) ? cityAreas : typeof cityAreas === "undefined" ? [] : [cityAreas]}
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
            subjectAreaLabel: subjectAreaCheckboxLabel,
            cityAreaLabel: cityAreaCheckboxLabel,
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

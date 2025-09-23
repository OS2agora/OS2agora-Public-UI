import * as React from "react";

import { Container } from "../atoms/Container";
import { Search } from "./Search";
import { Headline } from "../atoms/Headline";
import { ColoredLine } from "../atoms/ColoredLine";
import { Caption } from "../atoms/Caption";
import { IconButton } from "../atoms/IconButton";
import { ListIcon } from "../icons";

import { useLargeDeviceUp, useMediumDeviceDown } from "../../hooks/mediaQueryHooks";
import { Form, Formik } from "formik";
import { FormControl } from "../atoms/FormControl";
import { Display } from "../atoms/Display";
import { FormLabel } from "../atoms/FormLabel";

type TitleBarWithSearchProps = {
  title: string;
  filter: string;
  onClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onSearch(values: { search: string }): void;
  placeholder: string;
  initialValue: string;
  label: string;
};

type SearchFormProps = {
  onSearch(values: { search: string }): void;
  placeholder: string;
  initialValue?: string;
  label: string;
};

const SearchForm = ({ onSearch, placeholder, initialValue = "", label }: SearchFormProps) => {
  return (
    <Formik
      initialValues={{
        search: initialValue,
      }}
      enableReinitialize
      onSubmit={onSearch}
    >
      {() => (
        <Form>
          <FormControl>
            <FormLabel classes="sr-only">{label}</FormLabel>
            <Search name="search" placeholder={placeholder} />
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

const TitleBarWithSearch = ({
  title,
  filter,
  onClick,
  onSearch,
  placeholder,
  initialValue,
  label,
}: TitleBarWithSearchProps) => {
  const smallDevice = useMediumDeviceDown();
  const largeDevice = useLargeDeviceUp();

  const TitleComponent = largeDevice ? Display : Headline;
  const titleType = largeDevice ? "light" : "heavy";
  const coloredLineThickness = largeDevice ? "large" : "small";

  return smallDevice ? (
    <Container>
      <SearchForm onSearch={onSearch} placeholder={placeholder} initialValue={initialValue} label={label} />
      <div className="bg-white mt-6 pt-4 pl-8">
        <TitleComponent type={titleType} component="h1">
          {title}
          <ColoredLine position="left" classes="mt-2 mb-4" />
        </TitleComponent>
      </div>
      <div className="flex items-center justify-end space-x-4">
        <Caption type="heavy" classes="text-blue-center">
          {filter}
        </Caption>
        <IconButton icon={<ListIcon aria-label={filter} />} onClick={onClick} />
      </div>
    </Container>
  ) : (
    <Container classes="flex justify-between">
      <div className="bg-white py-4 px-8 w-6/12 mr-5 desktop:w-4/12 desktop:mr-0">
        <TitleComponent type={titleType} component="h1">
          {title}
          <ColoredLine size={coloredLineThickness} position="left" classes="mt-1.5" />
        </TitleComponent>
      </div>
      <div className="w-6/12 desktop:w-4/12">
        <SearchForm onSearch={onSearch} placeholder={placeholder} initialValue={initialValue} label={label} />
        <div className="flex items-center justify-end space-x-4 desktop:mt-4">
          <Caption type="heavy" classes="text-blue-center">
            {filter}
          </Caption>
          <IconButton icon={<ListIcon aria-label={filter} />} onClick={onClick} />
        </div>
      </div>
    </Container>
  );
};

export { TitleBarWithSearch };

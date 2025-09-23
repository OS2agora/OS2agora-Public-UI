import * as React from "react";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { Button } from "../atoms/Button";
import { Checkbox } from "../atoms/Checkbox";
import { ColoredLine } from "../atoms/ColoredLine";
import { FormControl } from "../atoms/FormControl";
import { Headline } from "../atoms/Headline";
import { NavigationBar } from "../atoms/NavigationBar";
import { RadioButton } from "../atoms/RadioButton";
import { Slider } from "../atoms/Slider";
import { TimesIcon } from "../icons";
import { FormLabel } from "../atoms/FormLabel";

type FilterTextsProps = {
  title: string;
  radioButtonLabel: string;
  filterCloseButtonLabel: string;
  checkboxLabel: string;
  submitText: string;
};

type InputProps = {
  value: string;
  text: string;
};

type FilterProps = {
  classes?: string;
  onSubmit: (values: any) => void | Promise<any>;
  open: boolean;
  texts: FilterTextsProps;
  radioButtonOptions: InputProps[];
  checkboxOptions: InputProps[];
  onCloseFilter(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  initialRadioButtonOption?: string;
  initialCheckboxOptions?: string | string[] | undefined;
};

const styling = {
  root: "shadow-2xl",
  card: "bg-white tablet:bg-transparent py-4 px-8 mb-10 mx-6 mt-8",
  form: "px-6",
  radioButtonLabel: "pb-4 px-8",
  radio: "bg-white py-2 px-8 flex",
  radioContainer: "flex flex-col space-y-2 mb-10",
  checkboxLabel: "pb-4 px-8",
  navigationContainer: "mt-10",
  checkbox: "px-8",
  button: "pl-6 pt-6",
};

const Filter = ({
  classes,
  onSubmit,
  texts,
  radioButtonOptions,
  checkboxOptions,
  open,
  initialRadioButtonOption = "",
  initialCheckboxOptions = [],
  onCloseFilter,
  ...rest
}: FilterProps) => {
  const className = clsx(styling.root, classes);

  return (
    <Slider classes={className} open={open} {...rest}>
      <div className={styling.button}>
        <TimesIcon icon={<TimesIcon aria-label={texts.filterCloseButtonLabel} />} onClick={onCloseFilter} />
      </div>
      <div className={styling.card}>
        <Headline type="heavy">{texts.title}</Headline>
        <ColoredLine />
      </div>
      <Formik
        initialValues={{
          hearingType: initialRadioButtonOption,
          subjectAreas: initialCheckboxOptions,
        }}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className={styling.form}>
            <FormControl>
              <FormLabel classes={styling.radioButtonLabel} isFixedSize={true}>
                {texts.radioButtonLabel}
              </FormLabel>
              <div className={styling.radioContainer}>
                {radioButtonOptions.map((option, index) => (
                  <div className={styling.radio} key={index}>
                    <RadioButton name="hearingType" value={option.value}>
                      {option.text}
                    </RadioButton>
                  </div>
                ))}
              </div>
              {checkboxOptions.length > 0 ? (
                <div>
                  <FormLabel classes={styling.checkboxLabel} isFixedSize={true}>
                    {texts.checkboxLabel}
                  </FormLabel>
                  {checkboxOptions.map((option, index) => (
                    <Checkbox classes={styling.checkbox} name="subjectAreas" value={option.value} key={index}>
                      {option.text}
                    </Checkbox>
                  ))}
                </div>
              ) : null}
            </FormControl>
            <NavigationBar fixed={false} classes={styling.navigationContainer}>
              <Button type="submit" classes="flex-grow">
                {texts.submitText}
              </Button>
            </NavigationBar>
          </Form>
        )}
      </Formik>
    </Slider>
  );
};

export { Filter };

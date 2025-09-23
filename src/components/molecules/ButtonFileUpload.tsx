import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";
import { validateFileSize } from "../../utilities/fileHelper";
import { Body } from "../atoms/Body";

import { Caption } from "../atoms/Caption";
import { UploadIcon } from "../icons";

type ButtonFileUploadProps = FieldHookConfig<File[]> & {
  classes?: string;
  children: React.ReactNode;
  multiple?: boolean;
  maxFileSize?: number;
  maxFileSizeText: string;
  onUploadFileError: (files: File[]) => void;
};

const styling = {
  root: "",
  labelContainer: "bg-grey-dark text-white p-2.5 rounded",
  label: "flex align-center justify-center space-x-4",
  input: "sr-only",
  body: "mt-2",
};

const ButtonFileUpload = ({
  classes,
  children,
  maxFileSize,
  multiple = true,
  maxFileSizeText,
  onUploadFileError,
  ...rest
}: ButtonFileUploadProps) => {
  const [_, __, helpers] = useField({ ...rest });

  // https://github.com/formium/formik/issues/45#issuecomment-771371452
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const files = [...(event?.target?.files ?? [])] as File[];

    const validatedFiles = files.filter(validateFileSize(maxFileSize * 10 ** 6));
    const invalidFiles = files.filter((file) => !validateFileSize(maxFileSize * 10 ** 6)(file));

    if (invalidFiles.length) {
      onUploadFileError(invalidFiles);
    }

    if (!validatedFiles.length) {
      return;
    }

    // Propagate value to formik
    helpers.setValue(validatedFiles);
  }

  const className = clsx(styling.root, classes);

  return (
    <div className={className}>
      <div className={styling.labelContainer}>
        <label className={styling.label}>
          <UploadIcon />
          <Caption component="span" type="regular">
            {children}
          </Caption>
          <input type="file" multiple={multiple} onChange={handleChange} className={styling.input} />
        </label>
      </div>
      <Body type="regular" classes={styling.body}>{`${maxFileSizeText}: ${maxFileSize} MB`}</Body>
    </div>
  );
};

export { ButtonFileUpload };

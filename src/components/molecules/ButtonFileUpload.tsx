import React from "react";
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
  maxFileCount?: number;
  maxFileCountText: string;
  allowedFileTypesText: string;
  allowedFileTypes?: string[];
  onUploadFileError: (files: File[]) => void;
};

const styling = {
  root: "",
  labelContainer: "bg-grey-dark text-white p-2.5 rounded-sm",
  label: "flex align-center justify-center space-x-4 cursor-pointer",
  input: "sr-only",
  body: "mt-2",
};

const ButtonFileUpload = ({
  classes,
  children,
  maxFileSize,
  multiple = true,
  maxFileSizeText,
  maxFileCount,
  maxFileCountText,
  onUploadFileError,
  allowedFileTypesText,
  allowedFileTypes,
  ...rest
}: ButtonFileUploadProps) => {
  const [field, __, helpers] = useField({ ...rest });

  // https://github.com/formium/formik/issues/45#issuecomment-771371452
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const files = [...(event?.target?.files ?? [])] as File[];

    let validatedFiles = files;
    let invalidFiles: File[] = [];
    if (typeof maxFileSize === "number") {
      validatedFiles = files.filter(validateFileSize(maxFileSize * 10 ** 6));
      invalidFiles = files.filter((file) => !validatedFiles.includes(file));
    }

    if (invalidFiles.length > 0) {
      onUploadFileError(invalidFiles);
    }

    const filesAlreadyAccepted = field.value ?? [];
    validatedFiles.push(...filesAlreadyAccepted);

    if (!validatedFiles.length) {
      return;
    }

    if (typeof maxFileCount === "number" && validatedFiles.length > maxFileCount) {
      onUploadFileError(validatedFiles.slice(0, validatedFiles.length - filesAlreadyAccepted.length));
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
          <input
            type="file"
            multiple={multiple}
            onChange={handleChange}
            className={styling.input}
            accept={allowedFileTypes ? allowedFileTypes.join(",") : undefined}
          />
        </label>
      </div>
      {allowedFileTypesText ? <Body type="regular" classes={styling.body}>{`${allowedFileTypesText}`}</Body> : null}
      <Body type="regular" classes={styling.body}>{`${maxFileSizeText}: ${maxFileSize} MB`}</Body>
      <Body type="regular" classes={styling.body}>{`${maxFileCountText}: ${maxFileCount}`}</Body>
    </div>
  );
};

export { ButtonFileUpload };

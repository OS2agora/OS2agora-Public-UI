import React, { useCallback } from "react";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FieldHookConfig, useField } from "formik";

import { Caption } from "../atoms/Caption";
import { UploadIcon } from "../icons";
import { Body } from "../atoms/Body";
import { validateFileSize } from "../../utilities/fileHelper";

type DropFileUploadProps = FieldHookConfig<File[]> & {
  classes?: string;
  children: React.ReactNode;
  multiple?: boolean;
  dropText: string;
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
  labelContainer: "bg-grey-text-field h-44 flex justify-center border border-blue-grey border-dashed",
  label: "flex justify-center items-center flex-col space-y-1 w-full h-full cursor-pointer",
  icon: "text-blue-center text-2xl",
  input: "sr-only",
  body: "mt-2",
};

const DropFileUpload = ({
  classes,
  children,
  dropText,
  maxFileSize,
  maxFileSizeText,
  maxFileCount,
  maxFileCountText,
  onUploadFileError,
  allowedFileTypesText,
  allowedFileTypes,
  ...rest
}: DropFileUploadProps) => {
  const [field, __, helpers] = useField({ ...rest });

  // Propagate value to Formik
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let validatedFiles = acceptedFiles;
      let invalidFiles: File[] = [];
      if (typeof maxFileSize === "number") {
        validatedFiles = acceptedFiles.filter(validateFileSize(maxFileSize * 10 ** 6));
        invalidFiles = acceptedFiles.filter((file) => !validatedFiles.includes(file));
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

      helpers.setValue(validatedFiles);
    },
    [helpers, maxFileSize, onUploadFileError, maxFileCount, field.value]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop,
    accept: allowedFileTypes,
  });

  const className = clsx(styling.root, classes);

  return (
    <div className={className}>
      <div className={styling.labelContainer} {...getRootProps()}>
        <label className={styling.label}>
          <UploadIcon className={styling.icon} />
          {isDragActive ? (
            <Caption component="span" type="heavy">
              {dropText}
            </Caption>
          ) : (
            <Caption component="span" type="heavy">
              {children}
            </Caption>
          )}
          <input type="file" className={styling.input} {...getInputProps()} />
        </label>
      </div>
      {allowedFileTypesText ? <Body type="regular" classes={styling.body}>{`${allowedFileTypesText}`}</Body> : null}
      <Body type="regular" classes={styling.body}>{`${maxFileSizeText}: ${maxFileSize} MB`}</Body>
      <Body type="regular" classes={styling.body}>{`${maxFileCountText}: ${maxFileCount}`}</Body>
    </div>
  );
};

export { DropFileUpload };

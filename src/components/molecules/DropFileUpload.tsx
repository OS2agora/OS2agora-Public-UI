import { useCallback } from "react";
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
  onUploadFileError: (files: File[]) => void;
};

const styling = {
  root: "",
  labelContainer: "bg-grey-textField h-44 flex justify-center border border-blue-grey border-dashed",
  label: "flex justify-center items-center flex-col space-y-1 w-full h-full",
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
  onUploadFileError,
  ...rest
}: DropFileUploadProps) => {
  const [_, __, helpers] = useField({ ...rest });

  // Propagate value to Formik
  const onDrop = useCallback(
    (acceptedFiles) => {
      const validatedFiles = acceptedFiles.filter(validateFileSize(maxFileSize * 10 ** 6));
      const invalidFiles = acceptedFiles.filter((file) => !validateFileSize(maxFileSize * 10 ** 6)(file));

      if (invalidFiles.length) {
        onUploadFileError(invalidFiles);
      }

      if (!validatedFiles.length) {
        return;
      }

      helpers.setValue(validatedFiles);
    },
    [helpers, maxFileSize, onUploadFileError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: true,
    onDrop,
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
      <Body type="regular" classes={styling.body}>{`${maxFileSizeText}: ${maxFileSize} MB`}</Body>
    </div>
  );
};

export { DropFileUpload };

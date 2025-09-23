import * as React from "react";

function SvgFolder(props) {
  return (
    <svg
      viewBox="0 0 27 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M24.703 7.5H22.5V5.25C22.5 4.031 21.469 3 20.25 3h-7.5l-3-3h-7.5A2.25 2.25 0 000 2.25v13.5A2.22 2.22 0 002.25 18H21a2.22 2.22 0 001.875-1.031l3.75-6c.938-1.5-.14-3.469-1.922-3.469zM2.25 2.531c0-.14.094-.281.281-.281h6.281l3 3h8.157c.14 0 .281.14.281.281V7.5H7.125a2.3 2.3 0 00-1.969 1.125L2.25 13.5V2.531zM21 15.75H3.375l3.61-6H24.75l-3.75 6z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgFolder;

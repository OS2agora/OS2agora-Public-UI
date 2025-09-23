import * as React from "react";

function SvgLoupe(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeMiterlimit={10}
      >
        <circle cx={17} cy={17} r={16} />
        <path d="M28.3 28.3L47 47" />
      </g>
    </svg>
  );
}

export default SvgLoupe;

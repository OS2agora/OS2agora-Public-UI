import * as React from "react";

function SvgCalendar(props) {
  return (
    <svg
      viewBox="0 0 21 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M18.75 3H16.5V.562c0-.28-.281-.562-.563-.562h-1.874a.57.57 0 00-.563.563V3h-6V.562C7.5.282 7.219 0 6.937 0H5.063A.57.57 0 004.5.563V3H2.25A2.25 2.25 0 000 5.25v16.5A2.22 2.22 0 002.25 24h16.5A2.25 2.25 0 0021 21.75V5.25C21 4.031 19.969 3 18.75 3zm-.281 18.75H2.53c-.187 0-.281-.094-.281-.281V7.5h16.5v13.969c0 .187-.14.281-.281.281z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgCalendar;

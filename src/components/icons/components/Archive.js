import * as React from "react";

function SvgArchive(props) {
  return (
    <svg
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M21.75.5H2.25A2.25 2.25 0 000 2.75V6.5c0 .422.328.75.75.75h.75V20c0 .844.656 1.5 1.5 1.5h18c.797 0 1.5-.656 1.5-1.5V7.25h.75c.375 0 .75-.328.75-.75V2.75C24 1.531 22.969.5 21.75.5zm-1.5 18.75H3.75v-12h16.5v12zM21.75 5H2.25V2.75h19.5V5zM9.562 11.75h4.876a.57.57 0 00.562-.563v-1.124c0-.282-.281-.563-.563-.563H9.564a.57.57 0 00-.563.563v1.124c0 .329.234.563.563.563z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SvgArchive;

import React from "react";

function MarkerIcon({ basement,external,shadow,content,width,height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox={"0 0 "+width+" "+height}
    >
      <g>
        <path
          /* basement color */
          fill={basement}
          d="M737.14 1192.4a414.29 102.86 0 11-828.57 0 414.29 102.86 0 11828.57 0z"
          opacity="0.491"
          transform="matrix(.42076 0 0 .33728 237.52 576.38)"
        ></path>
        <path
        /* external color */
          fill={external}
          d="M373.3 58.058c-183.43.258-332.05 149.04-332.05 332.53 0 121.52 65.173 227.8 162.48 285.82 94.942 70.715 159.22 180.26 169.37 305.13l.197.337.084-.14.056.14.197-.337c10.16-124.88 74.43-234.42 169.38-305.13 97.312-58.012 162.48-164.3 162.48-285.82 0-183.49-148.62-332.27-332.05-332.53h-.14z"
        ></path>
        <path
        /* shadow content color */
          fill={shadow}
          d="M467.14 220.93a145.71 145.71 0 11-291.43 0 145.71 145.71 0 11291.43 0z"
          transform="translate(-118.15 51.446) scale(1.5292)"
        ></path>
        <path
        /* content color */
          fill={content}
          d="M467.14 220.93a145.71 145.71 0 11-291.43 0 145.71 145.71 0 11291.43 0z"
          transform="matrix(1.4997 0 0 1.4752 -108.69 55.502)"
        ></path>
      </g>
    </svg>
  );
}

export default MarkerIcon;

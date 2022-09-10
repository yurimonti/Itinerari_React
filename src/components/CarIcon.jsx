import React from "react";

function CarIcon({ color, thickness, style }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnssketchjs="https://sketch.io/dtd/"
      width="40"
      height="40"
      viewBox="0 0 380 280"
      className={"w-8 h-8 sm:w-10 sm:h-10 inline m-1 " + style}
      aria-hidden="true"
      sketchjsmetadata="eyJuYW1lIjoiRHJhd2luZy04LnNrZXRjaHBhZCIsInN1cmZhY2UiOnsibWV0aG9kIjoiZmlsbCIsImJsZW5kIjoibm9ybWFsIiwiZW5hYmxlZCI6dHJ1ZSwib3BhY2l0eSI6MSwidHlwZSI6InBhdHRlcm4iLCJwYXR0ZXJuIjp7InR5cGUiOiJwYXR0ZXJuIiwicmVmbGVjdCI6Im5vLXJlZmxlY3QiLCJyZXBlYXQiOiJyZXBlYXQiLCJzbW9vdGhpbmciOmZhbHNlLCJzcmMiOiJ0cmFuc3BhcmVudExpZ2h0Iiwic3giOjEsInN5IjoxLCJ4MCI6MC41LCJ4MSI6MSwieTAiOjAuNSwieTEiOjF9fSwiY2xpcFBhdGgiOnsiZW5hYmxlZCI6dHJ1ZSwic3R5bGUiOnsic3Ryb2tlU3R5bGUiOiJibGFjayIsImxpbmVXaWR0aCI6MX19LCJkZXNjcmlwdGlvbiI6Ik1hZGUgd2l0aCBTa2V0Y2hwYWQiLCJtZXRhZGF0YSI6e30sImV4cG9ydERQSSI6NzIsImV4cG9ydEZvcm1hdCI6InBuZyIsImV4cG9ydFF1YWxpdHkiOjAuOTUsInVuaXRzIjoicHgiLCJ3aWR0aCI6MzgwLCJoZWlnaHQiOjI4MCwicGFnZXMiOlt7IndpZHRoIjozODAsImhlaWdodCI6MjgwfV0sInV1aWQiOiIwMjNkYjU0MC0zZTViLTQyMTItYmFkYy0xNjc3YjBlNTk3ZDQifQ=="
    >
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 116L1 66 28.94 32 85 1 210.39 0 270.52 46 344 69 346.16 115"
        transform="matrix(.95426 0 0 1 26.211 77)"
        sketchjstool="polyline"
      ></path>
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M60.106 181.889c3.872-13.554 18.004-21.405 31.558-17.533 13.554 3.873 21.405 18.005 17.533 31.559-3.873 13.554-18.005 21.405-31.559 17.532-13.554-3.872-21.405-18.004-17.532-31.558zM263.606 181.889c3.872-13.554 18.004-21.405 31.558-17.533 13.554 3.873 21.405 18.005 17.533 31.559-3.873 13.554-18.005 21.405-31.559 17.532-13.554-3.872-21.405-18.004-17.532-31.558z"
        vectorEffect="fixed-position"
        sketchjstool="circle"
      ></path>
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M0 0L29 1"
        transform="translate(26 194)"
        sketchjstool="polyline"
      ></path>
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M141 1L0 0"
        transform="translate(116 195.5)"
        sketchjstool="polyline"
      ></path>
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={thickness}
        d="M54 0L0 2 54 0"
        transform="matrix(.82716 0 0 1 315.926 192)"
        sketchjstool="polyline"
      ></path>
    </svg>
  );
}

export default CarIcon;

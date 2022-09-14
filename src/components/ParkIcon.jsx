import React from "react";

function ParkIcon({className,color}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnssketchjs="https://sketch.io/dtd/"
      className={className}
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 131 129"
      sketchjsmetadata="eyJuYW1lIjoiRHJhd2luZy0yLnNrZXRjaHBhZCIsInN1cmZhY2UiOnsibWV0aG9kIjoiZmlsbCIsImJsZW5kIjoibm9ybWFsIiwiZW5hYmxlZCI6dHJ1ZSwib3BhY2l0eSI6MSwidHlwZSI6InBhdHRlcm4iLCJwYXR0ZXJuIjp7InR5cGUiOiJwYXR0ZXJuIiwicmVmbGVjdCI6Im5vLXJlZmxlY3QiLCJyZXBlYXQiOiJyZXBlYXQiLCJzbW9vdGhpbmciOmZhbHNlLCJzcmMiOiJ0cmFuc3BhcmVudExpZ2h0Iiwic3giOjEsInN5IjoxLCJ4MCI6MC41LCJ4MSI6MSwieTAiOjAuNSwieTEiOjF9fSwiY2xpcFBhdGgiOnsiZW5hYmxlZCI6dHJ1ZSwic3R5bGUiOnsic3Ryb2tlU3R5bGUiOiJibGFjayIsImxpbmVXaWR0aCI6MX19LCJkZXNjcmlwdGlvbiI6Ik1hZGUgd2l0aCBTa2V0Y2hwYWQiLCJtZXRhZGF0YSI6e30sImV4cG9ydERQSSI6NzIsImV4cG9ydEZvcm1hdCI6InBuZyIsImV4cG9ydFF1YWxpdHkiOjAuOTUsInVuaXRzIjoicHgiLCJ3aWR0aCI6MTMxLCJoZWlnaHQiOjEyOSwicGFnZXMiOlt7IndpZHRoIjoxMzEsImhlaWdodCI6MTI5fV0sInV1aWQiOiJlYTNhNGE2Ni05ZmVkLTQxZDMtYjkzZi00NzYwNGZkZjQxYjMifQ=="
    >
      <g sketchjstool="fancyText" sketchjsuid="1">
        <g sketchjsuid="2">
          <path
            d="M50.798 74.5H37.862V17.124h19.712q4.752 0 8.888.924t7.216 3.08q3.08 2.156 4.884 5.72 1.804 3.564 1.804 8.756 0 5.016-1.804 8.712-1.804 3.696-4.884 6.072t-7.128 3.52q-4.048 1.144-8.624 1.144h-7.128V74.5zm0-47.08v17.336h6.336q10.56 0 10.56-9.152 0-4.488-2.816-6.336-2.816-1.848-8.096-1.848h-5.984z"
            paintOrder="stroke fill markers"
            fill={color}
            transform="translate(10.194 21.97)"
            sketchjsuid="3"
          ></path>
        </g>
      </g>
      <path
        style={{ mixBlendMode: "source-over" }}
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="12"
        d="M58 21c25.41-4.418 49.581 12.592 54 38 4.419 25.41-12.59 49.581-38 54-25.408 4.419-49.58-12.591-53.999-38-4.419-25.408 12.591-49.58 38-54z"
        vectorEffect="fixed-position"
        sketchjstool="circle"
      ></path>
    </svg>
  );
}

export default ParkIcon;

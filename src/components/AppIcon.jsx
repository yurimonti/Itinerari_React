export default function AppIcon({ color, style }) {
  return (
    <div>
      <p className="float-left inline text-[#4287f5]">
        EPPOI
      </p>
      <svg
        className={"w-6 h-6 clear-both" + style }
        fill={color}
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

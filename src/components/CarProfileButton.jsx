import React from "react";
import CarIcon from "./CarIcon";

function CarProfileButton({clicked,setClicked}) {
  return (
    <button
      type="button"
      className={
        clicked
          ? "m-1 rounded-full border-4  border-indigo-600"
          : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 sm:hover:shadow-xl sm:hover:border-indigo-600 sm:hover:shadow-indigo-500 duration-250"
      }
      onClick={setClicked}
    >
      <CarIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="24" />
    </button>
  );
}

export default CarProfileButton;

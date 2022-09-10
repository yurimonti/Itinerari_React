import { useState } from "react";
import WheelChairIcon from "./WheelChairIcon";
import CyclingElectricIcon from "./CyclingElectricIcon";
import CarIcon from "./CarIcon";
import WalkingIcon from "./WalkingIcon";
import CarProfileButton from "./CarProfileButton";
function ProfileSelector({buttons}) {
  const [clicked, setClicked] = useState([true, false, false, false]);
  /* hover:-translate-y-1 hover:scale-110 */

  return (
    <div className="m-auto w-fit">
      <CarProfileButton clicked={clicked[0]} setClicked={()=>{setClicked([true,false,false,false])}} />
      <button
        type="button"
        className={
          clicked[1]
            ? "m-1 rounded-full border-4  border-indigo-600"
            : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
        }
        onClick={() => {
          !clicked[1] && setClicked([false, true, false, false]);
          console.log(clicked);
        }}
      >
        <WheelChairIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
      </button>
      <button
        type="button"
        className={
          clicked[2]
            ? "m-1 rounded-full border-4  border-indigo-600"
            : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
        }
        onClick={() => {
          !clicked[2] && setClicked([false, false, true, false]);
          console.log(clicked);
        }}
      >
        <CyclingElectricIcon
          /*color="#4F46E5"*/ color="#4F46E5"
          thickness="22"
        />
      </button>
      <button
        type="button"
        className={
          clicked[3]
            ? "m-1 rounded-full border-4  border-indigo-600"
            : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
        }
        onClick={() => {
          !clicked[3] && setClicked([false, false, false, true]);
          console.log(clicked);
        }}
      >
        <WalkingIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
      </button>
    </div>
  );
}

export default ProfileSelector;

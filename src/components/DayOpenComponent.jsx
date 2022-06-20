import ExampleListBox from "./ExampleListBox";
import { useState } from "react";

export default function DayOpenComponent({keyValue,multiple}) {
  const [days,setDays]=useState([
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    { name: "Sunday" }
  ]);
  const [selectedDay,setSelectedDay] = useState({});
  return (
    <>
    {/* apertura */}
      <ExampleListBox
        values={days}
        onChange={setSelectedDay}
        value={selectedDay}
        multiple={multiple}
        keyValue={keyValue}
      />
    </>
  );
}

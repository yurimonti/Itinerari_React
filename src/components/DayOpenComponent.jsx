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
  const [selectedDays,setSelectedDays] = useState([]);
  return (
    <>
    {/* apertura */}
      <ExampleListBox
        values={days}
        onChange={setSelectedDays}
        value={selectedDays}
        multiple={multiple}
        keyValue={keyValue}
      />
    </>
  );
}

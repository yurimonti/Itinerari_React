import { useState } from "react";
//FIXME: valutare bene
const OpenHourComponent = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [disable, setDisable] = useState(false);

  const [monday, setMonday] = useState({
    start: [],
    end: [],
  });

  function setStart() {
    setMonday((prev) => {
      prev.start.push(from);
      return prev;
    });
  }

  function setEnd() {
    if (to !== undefined)
      setMonday((prev) => {
        prev.end.push(to);
        return prev;
      });
  }


  return (
    <>
      <div className="justify-center flex">
        <label className="block text-sm font-medium text-gray-700 mr-2">
          From
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          readOnly={disable}
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        />
        <label className="block text-sm font-medium text-gray-700 mr-2">
          To
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          readOnly={disable}
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        />
      </div>
      <button
        type="button"
        className="m-4"
        onClick={() => {
          setStart();
          setEnd();
          setDisable(true);
        }}
      >
        Add
      </button>
      <button
        type="button"
        className="m-4"
        onClick={() => {
          setMonday({
            start: [],
            end: [],
          });
          setFrom("");
          setTo("");
          setDisable(false);
        }}
      >
        Clear
      </button>
      <button
        type="button"
        className="m-4"
        onClick={() => {
          console.log(monday.start[0] + " " + monday.end[0]);
        }}
      >
        Print to Console
      </button>
    </>
  );
};
export default OpenHourComponent;

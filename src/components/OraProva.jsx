import { useState } from "react";
//FIXME: valutare bene
const OraProva = ({keyValue,value,setValue}) => {
  const [input0, setInput0] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const [disable, setDisable] = useState(false);

  const [hours, setHours] = useState([]);

  function logHours() {
    console.log(
      value[0] + " ; " + value[1] + " ; " + value[2] + " ; " + value[3] + " ; "
    );
  }

  return (
    <>
    <label>{keyValue}</label>
      <div className="justify-center flex">
        <label className="block text-sm font-medium text-gray-700 mr-2">
          Dalle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[0]}
          onChange={(e) => {
            setValue((prev) => {
              prev[0] = e.target.value;
              return prev;
            });
          }}
        />
        <label className="block text-sm font-medium text-gray-700 mr-2">
          Alle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[1]}
          onChange={(e) => {
            setValue((prev) => {
              prev[1] = e.target.value;
              return prev;
            });
          }}
        />
      </div>
      <div className="justify-center flex">
        <label className="block text-sm font-medium text-gray-700 mr-2">
          Dalle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[2]}
          onChange={(e) => {
            setValue((prev) => {
              prev[2] = e.target.value;
              return prev;
            });
          }}
        />
        <label className="block text-sm font-medium text-gray-700 mr-2">
          Alle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[3]}
          onChange={(e) => {
            setValue((prev) => {
              prev[3] = e.target.value;
              return prev;
            });
          }}
        />
      </div>
    </>
  );
};
export default OraProva;

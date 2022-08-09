const OraProva = ({keyValue,value,setValue}) => {

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

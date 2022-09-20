//Component that render a line of 4 input time for a day hours.
const DayHoursComponent = ({ keyValue, value, setValue }) => {
  return (
    <>
      <label className="col-start-1 col-end-5 sm:col-start-1 sm:col-end-2 my-2 text-sm font-medium text-gray-700">
        {keyValue}
      </label>
      <div className="justify-center flex col-start-1 col-end-5 sm:col-start-2 sm:col-end-4">
        <label className="block text-sm font-medium text-gray-700 mt-2 mr-2">
          Dalle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[0]}
          onChange={(e) => {
            setValue((prev) => {
              let result = [...prev];
              result[0] = e.target.value;
              return result;
            });
          }}
        />
        <label className="block text-sm font-medium text-gray-700 mt-2 mr-2">
          Alle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[1]}
          onChange={(e) => {
            setValue((prev) => {
              let result = [...prev];
              result[1] = e.target.value;
              return result;
            });
          }}
        />
      </div>
      <div className="justify-center flex col-start-1 col-end-5 sm:col-start-4 sm:col-end-6">
        <label className="block text-sm font-medium text-gray-700 mt-2 mr-2">
          Dalle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[2]}
          onChange={(e) => {
            setValue((prev) => {
              let result = [...prev];
              result[2] = e.target.value;
              return result;
            });
          }}
        />
        <label className="block text-sm font-medium text-gray-700 mt-2 mr-2">
          Alle
        </label>
        <input
          type="time"
          className="hover:bg-indigo-200"
          value={value[3]}
          onChange={(e) => {
            setValue((prev) => {
              let result = [...prev];
              result[3] = e.target.value;
              return result;
            });
          }}
        />
      </div>
    </>
  );
};
export default DayHoursComponent;

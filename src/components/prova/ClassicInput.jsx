const ClassicInput = ({name,symbol, setValue, label, type, placeholder, min}) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        {symbol !== null && (
          <div className="mr-2 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-black-500 md:text-l sm:text-sm">
              {symbol}
            </span>
          </div>
        )}
        <input
          onChange={setValue}
          type={type}
          min={min}
          name={name}
          id={name}
          className="focus:outline-none focus:ring-2 pl-3 pr-12 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-600"
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

  export default ClassicInput;
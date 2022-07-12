import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";

export default function InputSelect({
  value,
  onChange,
  multiple,
  values,
  toView,
  keyValue,
  displayString
}) {
  function realValue(value) {
    if(!displayString) return toView ? value[toView] : value;
    else return value.toString();
  }

  //FIXME: rivedere metodo.. da errore negli input per i tag.
  function toSet(value) {
    if (value===null || value===undefined || value.length === 0 || Object.keys(value).length === 0) return "Nessuna";
    if (multiple) {
      return value.map((sel) => realValue(sel)).join(", ");
    } else return realValue(value);
  }

  return (
    <Listbox value={value} onChange={onChange} multiple={multiple}>
      <Listbox.Label className="block text-sm font-medium text-gray-700 mr-3">
        {keyValue}
      </Listbox.Label>
      <div className="mt-1 relative">
        <Listbox.Button
          className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default
      focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {toSet(value)}
          <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Listbox.Options
          className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base
            ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
        >
          {values.map((val) => (
            <Listbox.Option key={realValue(val)} value={val}>
              {realValue(val)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

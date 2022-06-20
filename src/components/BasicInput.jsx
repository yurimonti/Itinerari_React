export default function BasicInput({name,value,label,onChange}){
    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type="text"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                autoComplete="given-name"
                className="mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
        </>
    );
}

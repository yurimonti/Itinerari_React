//Card Component
function CardComponent({ name, children, onClick,color,disabled }) {
  return (
    <div 
      className={color ? "min-w-fit bg-white group relative p-2 border-4 rounded-md "+color : "bg-white group relative p-2 border-4 rounded-md border-gray-300 hover:border-blue-400"}
    >
      <h2 className="text-md text-center text-gray-700">
        <a className={disabled ? "text-lg pointer-events-none" : "text-lg font-sans leading-8 tracking-tighter"} onClick={onClick}>
          <span aria-hidden="true" className="absolute inset-0" />
          {name}
        </a>
      </h2>
      <div className="mt-4 flex justify-between">
       {children}
      </div>
    </div>
  );
}

export default CardComponent;

import React from "react";

function CardComponent({ name, children, onClick,color,disabled }) {
  return (
    <div 
      className={color ? "group relative p-2 border-4 rounded-md "+color : "group relative p-2 border-4 rounded-md border-gray-300 hover:border-blue-400"}
    >
      <h2 className="text-md text-center text-gray-700">
        <a className={disabled ? "text-md pointer-events-none" : "text-md"} onClick={onClick}>
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

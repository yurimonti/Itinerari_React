import React from "react";
import LoadIcon from "./LoadIcon";
import MyAlert from "./MyAlert";

function LoadingComponent({ isLoading, onClose }) {
  return (
    <MyAlert
      transparent
      trigger={isLoading}
      close={onClose}
      content={
        <>
          <LoadIcon />
          <p className="pt-2 text-xl text-center">Caricamento...</p>
        </>
      }
    />
  );
}

export default LoadingComponent;

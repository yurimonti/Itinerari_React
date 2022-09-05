import React from "react";
import LoadIcon from "./LoadIcon";
import MyAlert from "./MyAlert";

function LoadingComponent({ isLoading, onClose }) {
  return (
    <div>
      <MyAlert
        transparent
        trigger={isLoading}
        close={onClose}
        content={
          <>
            <LoadIcon />
            <p className="text-center">Caricamento...</p>
          </>
        }
      />
    </div>
  );
}

export default LoadingComponent;

import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React from "react";

export default function ProvaMapsComponent() {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD9GL94L3nXz5TWvV8Ko3CtmAOmcBpXtxE",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 44, lng: -80 }}
      className="w-100 h-100" //cambiare
    ></GoogleMap>
  );
}

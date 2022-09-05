import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/ItineraryMapCreator.css";
import MyMarker from "./MyMarker";
import LoadingComponent from "../LoadingComponent";

function ItineraryMapCreator({ zoom, renderAll, center, handleClick }) {
  const [pois, setPois] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fillPois();
    return () => {
      setPois([]);
    };
  }, []);

  function fillPois() {
    setIsLoading(true);
    publicInstance
      .get("/api/poi/all")
      .then((res) => {
        setPois(res.data);
      })
      .then(() => setIsLoading(false))
      .catch((res) => {
        console.log(res.status);
        setIsLoading(false);
      });
  }

  function renderMarkers() {
    return (
      renderAll &&
      pois.map((poi) => {
        return (
          <MyMarker
            popUpEffect={{
              name: "aggiungi",
              action: () => {
                handleClick(poi);
              },
            }}
            key={poi.id}
            isPoiIcon={true}
            poi={poi}
            popup={true}
          />
        );
      })
    );
  }

  return (
    <div id="itineraryMap" className="leaflet-container">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution={"https://www.openstreetmap.org/copyright"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
      <LoadingComponent
        onClose={() => {
          setIsLoading(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}

export default ItineraryMapCreator;

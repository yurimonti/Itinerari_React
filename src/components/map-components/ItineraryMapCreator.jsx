import React from "react";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../../styles/ItineraryMapCreator.css";
import MyMarker from "./MyMarker";

function ItineraryMapCreator({ zoom, renderAll, center, handleClick }) {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    fillPois();
    return () => {
      setPois([]);
    };
  }, []);

  function fillPois() {
    publicInstance
      .get("/api/poi/all")
      .then((res) => {
        setPois(res.data);
      })
      .catch((res) => {
        console.log(res.status);
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
    <div id="itineraryMap" className="leaflet-container transition ease-in-out duration-400 delay-10 sm:hover:border-indigo-600 rounded-xl border-4 border-indigo-400">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution={"https://www.openstreetmap.org/copyright"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

export default ItineraryMapCreator;

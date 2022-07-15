import { useState, useEffect } from "react";
import { getMatrix } from "../../utils/map-utils/matrixService";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import Direction from "./Direction";
import { publicInstance } from "../../api/axiosInstance";
import "./MapComponent.css";
import L from "leaflet";
import MyMarker from "./MyMarker";

export default function MapComponent() {
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
    return pois.map((poi) => {
      return (
        <MyMarker key={poi.id} isPoiIcon={true} poi={poi} popup={true} />
      );
    });
  }

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[43.13454678335075, 13.066346732844925]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution={"https://www.openstreetmap.org/copyright"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

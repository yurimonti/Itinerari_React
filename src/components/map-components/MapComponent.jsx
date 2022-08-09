import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../../api/axiosInstance";
import "./MapComponent.css";
import MyMarker from "./MyMarker";

export default function MapComponent({ zoom, renderAll, center }) {
  const [pois, setPois] = useState([]);
  const navigate = useNavigate();

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
          <MyMarker popUpEffect={{name:"modifica",action:() => {
            navigate("/poi-form", { state: { poi: poi } });
          }}} key={poi.id} isPoiIcon={true} poi={poi} popup={true} />
        );
      })
    );
  }

  /* function calculateCenter(coords){
    return [coords[1],coords[0]];
  } */

  return (
    <div className="leaflet-container">
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

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import "./MapComponent.css";

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

  function renderInfoOfAPoi(poi) {
    let info = { title: poi.name, subtitle: poi.description };
    return (
      <>
        <h1>{info.title}</h1>
        <h4>{info.subtitle}</h4>
      </>
    );
  }

  function renderMarkers() {
    return pois.map((poi) => {
      return (
        <Marker
          key={poi.id}
          position={[poi.coordinate.lat, poi.coordinate.lon]}
        >
          <Popup>
            {renderInfoOfAPoi(poi)}
          </Popup>
        </Marker>
      );
    });
  }

  return (
    <div className="leaflet-container">
      <MapContainer
        center={[43.139641221333925, 13.068900421656135]}
        zoom={14}
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

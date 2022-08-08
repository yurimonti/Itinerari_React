import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import "./MapComponent.css";
import MyMarker from "./MyMarker";

export default function MapComponent({ data, zoom, renderAll, center }) {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    fillPois();
    return () => {
      setPois([]);
    };
  }, []);

  function provaRenderMarker() {
    return data?.metadata?.query?.coordinates.map((c) => {
      return <Marker key={c} position={[c[1], c[0]]} />;
    });
  }

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
          <MyMarker key={poi.id} isPoiIcon={true} poi={poi} popup={true} />
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
        <GeoJSON data={data} />
        {provaRenderMarker()}
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

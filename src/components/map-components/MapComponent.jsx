import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../../api/axiosInstance";
import "../../styles/map-style/MapComponent.css";
import MyMarker from "./MyMarker";
import L from "leaflet";

export default function MapComponent({ data,zoom, renderAll, center }) {
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

  function renderMarkerData() {
    return data?.metadata?.query?.coordinates.map((c) => {
      return <Marker key={c} position={[c[1], c[0]]} />;
    });
  }

  function renderMarkers() {
    return (
      renderAll &&
      pois.map((poi) => {
        return (
          <MyMarker popUpEffect={{name:"modifica",action:() => {
            navigate("/poi-form/poi/"+poi.id, { state: { poi: true } });
          }}} key={poi.id} isPoiIcon={true} poi={poi} popup={true} />
        );
      })
    );
  }

  function renderData(){
    if(data){
      return (
        <>
        <GeoJSON data={data}/>
        {renderMarkerData()}
        </>
      );
    }
  }

  /* function calculateCenter(coords){
    return [coords[1],coords[0]];
  } */

  return (
    <div id="map" className="leaflet-container">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
        <TileLayer
          attribution={"https://www.openstreetmap.org/copyright"}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderData()}
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

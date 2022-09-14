import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../../api/axiosInstance";
import "../../styles/map-style/MapComponent.css";
import MyMarker from "./MyMarker";
import "../../App.css";

//Component that renders a Leaflet Map
export default function MapComponent({ data, zoom, renderAll, center }) {
  const [pois, setPois] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fillPois();
    return () => {
      setPois([]);
    };
  }, []);

  /**
   * get all pois from server
   */
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

  /**
   *
   * @returns a component that render all Marker from a GeoJson
   */
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
          <MyMarker
            popUpEffect={{
              name: "modifica",
              action: () => {
                navigate("/poi-form/poi/" + poi.id, { state: { poi: true } });
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

  /**
   * render all marker and data from GeoJson
   */
  function renderData() {
    if (data) {
      return (
        <>
          <GeoJSON data={data} />
          {renderMarkerData()}
        </>
      );
    }
  }

  /* 
  function calculateCenter(coords){
    return [coords[1],coords[0]];
  } 
  */

  return (
    <div id="map" className="leaflet-container transition ease-in-out duration-400 delay-10 sm:hover:border-indigo-600 rounded-xl border-4 border-indigo-400">
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

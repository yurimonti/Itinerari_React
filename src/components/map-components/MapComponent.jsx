import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import "./MapComponent.css";
import L from "leaflet";
const Openrouteservice = require("openrouteservice-js");

export default function MapComponent() {
  const [pois, setPois] = useState([]);
  /**
   * salva il geojson dato dalla funzione di directions di openrouteservice
   */
  const DirectionsApi = new Openrouteservice.Directions({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
  });

  const MatrixApi = new Openrouteservice.Matrix({
    api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
  });
  const [directions, setDirections] = useState({ geojson: null });

  const [coords,setCoords] = useState([]);

  useEffect(() => {
    fillPois();
    getDirections([
      [13.073281922561705, 43.13775831166245],
      [13.070850295254097, 43.1386968630858]
    ]);
    /* getMatrix(
      [43.13775831166245, 13.073281922561705],
      [43.1386968630858, 13.070850295254097],
      [43.13934312209109, 13.07315869357204]
    ); */
    return () => {
      setPois([]);
    };
  }, []);

  /**
   * Calculate Matrix from coords
   * @param {number[][]} coords 
   */
  function getMatrix(coords) {
    MatrixApi.calculate({
      locations: [[8.690958, 49.404662], [8.687868, 49.390139], [8.687868, 49.390133]],
      profile: "driving-car",
      sources: ["all"],
      destinations: ["all"],
    })
      .then(function (response) {
        // Add your own result handling here
        console.log("response", response);
      })
      .catch(function (err) {
        const str = "An error occurred: " + err;
        console.log(str);
      });
  }

  function renderPathMarker(){
    return coords.map(c => {
      return (<Marker key={c[0]}
        position={[c[1], c[0]]}
        />)
    })
  }

  /**
   * calcola la direzione per delle cordinate.
   */
  function getDirections(coords) {
    DirectionsApi.calculate({
      coordinates: coords,
      profile: "foot-walking",
      extra_info: ["waytype", "steepness"],
      format: "geojson",
    })
      .then((resultJson) => {
        console.log(resultJson);
        setDirections({ geojson: resultJson });
        setCoords(coords);
      })
      .catch((err) => {
        console.log(err);
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

  function renderInfoOfAPoi(poi) {
    let info = { title: poi.name, subtitle: poi.description };
    return (
      <>
        <h1>{info.title}</h1>
        <h4>{info.subtitle}</h4>
      </>
    );
  }

  function getIcon(iconSize, image) {
    return L.icon({
      iconUrl: require("../../static/" + image),
      iconSize: iconSize,
    });
  }

/*   function isStandardMarker(result) {} */

  function adjustIcon(poi) {
    let typesPoi = poi.types.map((t) => {
      return t.name;
    });
    let result = "";
    switch (typesPoi[0]) {
      case "Chiesa":
        result = getIcon([30, 30], "christian-cross.png");
        break;
      case "Museo":
        result = getIcon([30, 30], "park.svg");
        break;
      default:
        result = getIcon([30, 30], "marker.png");
        break;
    }
    return result;
  }

  function renderMarkers() {
    return pois.map((poi) => {
      return (
        <Marker
          key={poi.id}
          position={[poi.coordinate.lat, poi.coordinate.lon]}
          icon={adjustIcon(poi)}
        >
          <Popup>{renderInfoOfAPoi(poi)}</Popup>
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
        {directions.geojson && (
          <>
          <GeoJSON
            data={directions.geojson}
          />
          {renderPathMarker()}
          </>
        )}
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

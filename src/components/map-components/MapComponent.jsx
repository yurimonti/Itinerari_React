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
    /* getMatrix(
      [
        [43.13775831166245, 13.073281922561705],
        [43.1386968630858, 13.070850295254097],
      ],
      "driving-car"
    )
      .then((res) => console.log(res))
      .catch((err) => {
        const str = "An error occurred: " + err;
        console.log(str);
      }); */
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

  /* function renderInfoOfAPoi(poi) {
    let info = { title: poi.name, subtitle: poi.description };
    return (
      <>
        <h1>{info.title}</h1>
        <h4>{info.subtitle}</h4>
      </>
    );
  } */

  /**
   * 
   * @param {*} iconSize 
   * @param {*} image 
   * @returns 
   */
  /* function getIcon(iconSize, image) {
    return L.icon({
      iconUrl: require("../../static/" + image),
      iconSize: iconSize,
    });
  } */

  /*   function isStandardMarker(result) {} */

  /* function adjustIcon(poi) {
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
  } */

  function renderMarkers() {
    return pois.map((poi) => {
      return (
        <MyMarker key={poi.id} isPoiIcon={true} poi={poi} />
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
        {/* <Direction
          coords={[
            [43.1384228747028, 13.07342784155618],
            [43.1386968630858, 13.070850295254097],
          ]}
          mode="driving-car"
        /> */}
        {renderMarkers()}
      </MapContainer>
    </div>
  );
}

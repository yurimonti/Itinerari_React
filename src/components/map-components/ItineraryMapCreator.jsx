import React from 'react';
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { publicInstance } from "../../api/axiosInstance";
import { useNavigate } from 'react-router-dom';
import "./ItineraryMapCreator.css";
import MyMarker from "./MyMarker";

function ItineraryMapCreator({ zoom, renderAll, center,handleClick }) {
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
            <MyMarker popUpEffect={{name:"aggiungi",action:() => {
                handleClick(poi);
              }}} key={poi.id} isPoiIcon={true} poi={poi} popup={true} />
          );
        })
      );
    }

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

export default ItineraryMapCreator;
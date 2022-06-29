import L from 'leaflet';
import { useEffect, useState } from 'react';
import { GeoJSON,Marker } from 'react-leaflet';
const {Directions} = require("openrouteservice-js");
import { reverseLatLng } from '../../utils/map-utils/coordsManager';

export default function Direction({coords,mode}){
    const [directions,setDirections] = useState({geojson:null});

    const DirectionsApi = new Directions({
        api_key: "5b3ce3597851110001cf624848c55ecec2484715aa4b6ca2cb0fec64",
    });

    useEffect(() => {
      getDirections();    
      return () => {
        setDirections({geojson:null});
      }
    }, []);
    

    /**
   * calcola la direzione per delle cordinate.
   */
  function getDirections() {
    DirectionsApi.calculate({
      coordinates: reverseLatLng(coords),
      profile: mode,
      extra_info: ["waytype", "steepness"],
      format: "geojson",
    })
      .then((resultJson) => {
        setDirections({ geojson: resultJson });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function renderPathMarker() {
    return coords.map((c) => {
      return <Marker key={c[0]+c[1]} position={[c[0],c[1]]} />;
    });
  }

  return(
    directions.geojson && (
      <>
       <GeoJSON
        data={directions.geojson}
      />
      {renderPathMarker()}
      </>
    )
  );

}
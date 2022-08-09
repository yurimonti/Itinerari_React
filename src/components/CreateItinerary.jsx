import React, { useState, useEffect } from "react";
import { getDirections } from "../utils/map-utils/directionService";
import ItineraryMapCreator from "./map-components/ItineraryMapCreator";

export default function CreateItinerary() {
  const [addedPois, setAddedPois] = useState([]);
  /* const [addedPois, setAddedPois] = useState({}); */

  useEffect(() => {}, []);

  function addPoiToItinerary(poi) {
    setAddedPois((prev) => {
      return [...prev, poi];
    });
    console.log(addedPois);
  }

  function deletePoiFromAdded(poi) {
    setAddedPois((prev) => {
      let another = [...prev];
      let index = another.indexOf(poi);
      if (index !== -1) {
        another.splice(index, 1);
      }
      return another;
    });
  }

  function renderList() {
    /* return <li>{addedPois.name}</li> */
    return (
      <ol style={{ listStyleType: "number" }}>
        {addedPois.map((poi) => {
          return (
            <li key={poi.id}>
              {" "}
              {poi.name}
              <button
                type="button"
                onClick={() => {
                  deletePoiFromAdded(poi);
                }}
                className="bg-red-500"
              >
                {" "}
                X{" "}
              </button>
            </li>
          );
        })}
      </ol>
    );
  }

  function createNewItinerary(){
    let coords = addedPois.map(p => p.coordinate);
    getDirections(coords).then(res => console.log(res)).catch(err =>console.log(err));
  }

  return (
    <div>
      <h1 className="text-center">Create Itinerary</h1>
      <ItineraryMapCreator
        renderAll
        zoom={15}
        center={[43.13629626765269, 13.06711823898054]}
        handleClick={addPoiToItinerary}
      />
      <br />
      <div /* className="flex m-auto" */>
        {renderList()}
        <button
          type="button"
          className="flex m-auto border border-4 p-1 rounded-md hover:border-sky-500 border-sky-300"
          onClick={() => {
            //TODO: mettere chiamata creazione Poi
            createNewItinerary();
          }}
        >
          Completa
        </button>
      </div>
    </div>
  );
}

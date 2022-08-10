import React, { useState, useEffect } from "react";
import { getDirections } from "../utils/map-utils/directionService";
import ItineraryMapCreator from "./map-components/ItineraryMapCreator";
import { publicInstance } from "../api/axiosInstance";
import ModalComponent from "./ente-components/ModalComponent";

const initialInputs = { name: "", description: "" };

export default function CreateItinerary() {
  const [addedPois, setAddedPois] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  /* const [addedPois, setAddedPois] = useState({}); */

  //---------------------------------use Effect----------------------------
  useEffect(() => {
    return () => {
      setInputs(initialInputs);
    };
  }, []);

  //---------------------------------Apis----------------------------

  function createNewItinerary() {
    createGeoJson().then((data) => {
      publicInstance.post(
        "/api/ente/itinerary",
        {
          poiIds: addedPois.map((p) => p.id.toString()),
          geojson: JSON.stringify(data),
          travelTime: data.features[0].properties.summary.duration.toString(),
          name: inputs.name,
          description: inputs.description,
        },
        {
          params: { username: "ente_camerino" },
        }
      ).then(res => console.log(res)).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  //----------------------------handle modal inputs---------------------------

  function handleInputsChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs);
  }

  //---------------------------------some functions-------------------------

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

  //--------------------------render functions----------------------------------------------

  function renderList() {
    /* return <li>{addedPois.name}</li> */
    return (
      <ol className="ml-5" style={{ listStyleType: "number" }}>
        {addedPois.map((poi) => {
          return (
            <li role="list" key={poi.id}>
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

  //------------------------------------------create GeoJson-----------------------------

  async function createGeoJson() {
    let coords = addedPois.map((p) => p.coordinate);
    coords = coords.map(c =>[c.lat,c.lon]);
    console.log(coords);
    const geoJson = await getDirections(coords);
    return geoJson;
  }

  //-------------------------------return Component--------------------------------------

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
            setOpen(true);
          }}
        >
          Completa
        </button>
        <ModalComponent
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          deny={() => {
            //settare eliminato richiesta
            console.log(inputs);
            setOpen(false);
          }}
          accept={() => {
            //aggiungere metodo consensus
            console.log(addedPois);
            createNewItinerary();
            setOpen(false);
          }}
          title="TITOLO"
        >
          <input
            className="block"
            name="name"
            type="text"
            placeholder="Inserire Nome Itinerario ..."
            value={inputs.name}
            onChange={handleInputsChange}
          />
          <textarea
            className="block"
            name="description"
            placeholder="Inserire Descrizione Itinerario ..."
            value={inputs.description}
            onChange={handleInputsChange}
          />
        </ModalComponent>
      </div>
    </div>
  );
}

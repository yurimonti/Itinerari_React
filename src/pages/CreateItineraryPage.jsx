import { useState, useEffect } from "react";
import { provaGetDirections } from "../utils/map-utils/directionService";
import ItineraryMapCreator from "../components/map-components/ItineraryMapCreator";
import { publicInstance } from "../api/axiosInstance";
import ModalComponent from "../components/ModalComponent";
import { reverseLatLng } from "../utils/map-utils/coordsManager";
import { useUserContext } from "../utils/UserInfoProvider";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent";
import { ArrowRightIcon } from "@heroicons/react/solid";

const initialInputs = { name: "", description: "" };
const profiles = [
  "driving-car",
  "wheelchair",
  "cycling-electric",
  "foot-walking",
];

export default function CreateItineraryPage({ role }) {
  const [addedPois, setAddedPois] = useState([]);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const { username } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  //---------------------------------use Effect----------------------------
  useEffect(() => {
    return () => {
      setInputs(initialInputs);
    };
  }, [role]);

  //---------------------------------Apis----------------------------

  function createNewItinerary() {
    createGeoJsonList()
      .then((data) => {
        const stringGeoJson = data.map((geo) => JSON.stringify(geo));
        return stringGeoJson;
      })
      .then((data) => {
        setIsLoading(true);
        publicInstance
          .post(
            "/api/" + role + "/itinerary",
            {
              poiIds: addedPois.map((p) => p.id.toString()),
              geoJsonList: data,
              name: inputs.name,
              description: inputs.description,
            },
            {
              params: {
                username: username,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .then(() => {
            setIsLoading(false);
            navigate("/itineraries");
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  //----------------------------handle modal inputs---------------------------

  function handleInputsChange(e) {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  //---------------------------------some functions-------------------------

  function addPoiToItinerary(poi) {
    setAddedPois((prev) => {
      return [...prev, poi];
    });
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
  async function createGeoJsonList() {
    let coords = addedPois.map((p) => p.coordinate);
    coords = coords.map((c) => [c.lat, c.lon]);
    coords = reverseLatLng(coords);
    let result = [];
    for (const profile of profiles) {
      try {
        const res = await provaGetDirections(coords, profile);
        result.push(res);
      } catch (err) {
        console.log(err);
      }
    }
    return result;
  }

  //-------------------------------return Component--------------------------------------

  return (
    <div>
      <h1 className="text-center font-medium text-lg mb-2">
        Crea un itinerario
      </h1>
      <ItineraryMapCreator
        renderAll
        zoom={15}
        center={[43.13629626765269, 13.06711823898054]}
        handleClick={addPoiToItinerary}
      />
      <br />
      <div>
        {renderList()}
        <button
          type="button"
          className="transition ease-in-out delay-10 sm:hover:shadow-lg sm:hover:scale-105 sm:hover:shadow-indigo-500 duration-250 p-1 flex sm:float-right sm:m-2 m-auto border-4 rounded-md sm:hover:border-indigo-600 border-indigo-400"
          onClick={() => {
            setOpen(true);
          }}
        >
          Completa{" "}
          <ArrowRightIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
        </button>
        <ModalComponent
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          accept={
            inputs.name !== "" && inputs.description !== ""
              ? {
                  title: "conferma itinerario",
                  action: () => {
                    createNewItinerary();
                    setOpen(false);
                  },
                }
              : undefined
          }
          title="Conferma?"
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
      <LoadingComponent
        onClose={() => {
          setIsLoading(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}

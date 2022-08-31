import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "./ErrorPage";
import { printArray, mToKmRounded } from "../utils/utilFunctions";
import MapComponent from "../components/map-components/MapComponent";
import { calculateCenter } from "../utils/map-utils/coordsManager";
import { Listbox } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/solid";
import InstructionsComponent from "../components/itinerary-components/InstructionsComponent";

const initialData = {
  id: 0,
  name: "",
  description: "",
  categories: [],
  timeToVisit: 0.0,
  points: [],
  createdBy: "",
  cities: [],
  geoJsonList: [],
};

export default function DescriptionLists() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(initialData);
  const [error, setError] = useState(false);
  const [geoJsonSelect, setGeoJsonSelect] = useState([]);
  const [currentGeoJson, setCurrentGeoJson] = useState({});
  const [click, setClick] = useState(false);
  const { state } = useLocation();

  function getDataById() {
    let url = state?.isRequest ? "/api/itinerary-request" : "/api/itinerary";
    publicInstance
      .get(url, {
        params: { id: id },
      })
      .then((res) => {
        const data = res.data;
        if (data.geoJsonList.length === 0) {
          setError(true);
        } else {
          setItinerary(data);
        }
        return data.geoJsonList.map((geo) => JSON.parse(geo));
      })
      .then((res) => {
        setGeoJsonSelect(
          res.map((r) => {
            return { name: r.metadata.query.profile, data: r };
          })
        );
        setCurrentGeoJson({
          name: res[0].metadata.query.profile,
          data: res[0],
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }
  useEffect(() => {
    getDataById();
    return () => {
      setItinerary(initialData);
      setGeoJsonSelect([]);
      setCurrentGeoJson({});
    };
  }, [id]);

  function renderMap() {
    return (
      click && (
        <MapComponent
          data={currentGeoJson.data}
          zoom={13}
          center={calculateCenter(
            currentGeoJson.data.metadata.query.coordinates[0]
          )}
        />
      )
    );
  }

  function handleChangeSelect(value) {
    setClick(false);
    setCurrentGeoJson(value);
  }

  return error ? (
    <ErrorPage />
  ) : (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Seleziona Profilo:{" "}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Listbox value={currentGeoJson} onChange={handleChangeSelect}>
                <div className="mt-1 relative">
                  <Listbox.Button
                    className="relative bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default
            focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    {currentGeoJson.name}
                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Listbox.Options
                    className="z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base
            ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                  >
                    {geoJsonSelect.map((geo) => (
                      <Listbox.Option key={geo.name} value={geo}>
                        {geo.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </div>
              </Listbox>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nome</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Descrizione</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary?.description}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Città</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {printArray(itinerary.cities.map((c) => c.name))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Punti di visita
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.points.map((point) => {
                return <li key={point.poi.id}> {point.poi.name}</li>;
              })}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tempo di visita totale
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.geoJsonList.length !== 0 &&
                Math.round(
                  (itinerary.timeToVisit +
                    currentGeoJson.data.features[0].properties.summary
                      .duration) /
                    60
                )}{" "}
              minuti
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Km percorrenza totale
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.geoJsonList.length !== 0 &&
                mToKmRounded(
                  currentGeoJson.data.features[0].properties.summary.distance
                )}{" "}
              km
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              {state?.isRequest ? "Richiesta effettuata da:" : "Creato da : "}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.createdBy}
            </dd>
          </div>
          {state?.isRequest ? (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Consensi</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {itinerary.consensus && (
                  <ul>
                    {itinerary?.consensus.map((c) => {
                      return <li key={c}>{c}</li>;
                    })}
                    {itinerary.consensus.length +
                      " / " +
                      itinerary.cities.length}
                  </ul>
                )}
              </dd>
            </div>
          ) : (
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Categorie</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {itinerary.categories.map((category) => {
                  return <li key={category.name}> {category.name}</li>;
                })}
              </dd>
            </div>
          )}
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Istruzioni</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.geoJsonList.length !== 0 && (
                <InstructionsComponent geojson={currentGeoJson.data} />
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mappa</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <button
                type="button"
                className="bg-gray-400"
                onClick={() => {
                  setClick((prev) => {
                    return !prev;
                  });
                }}
              >
                {click ? "chiudi mappa" : "apri mappa"}
              </button>
              {renderMap()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

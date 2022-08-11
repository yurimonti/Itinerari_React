/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "./ErrorPage";
import { printArray, mToKmRounded } from "../utils/utilFunctions";
import MapComponent from "../components/map-components/MapComponent";
import { calculateCenter } from "../utils/map-utils/coordsManager";
import InstructionsComponent from "../components/InstructionsComponent";

const initialData = {
  id: 0,
  name: "",
  description: "",
  categories: [],
  timeToVisit: 0.0,
  points: [],
  createdBy: "",
  cities: [],
  geoJson: "",
};

export default function DescriptionLists() {
  //TODO:
  //FIXME: vedere perche non funziona

  const { id } = useParams();
  const [itinerary, setItinerary] = useState(initialData);
  const [error, setError] = useState(false);

  function getDataById() {
    publicInstance
      .get("/api/itinerary", {
        params: { id: id },
      })
      .then((res) => {
        const data = res.data;
        data.geoJson === "" ? setError(true) : setItinerary(data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getDataById();
    return () => {
      setItinerary(initialData);
    };
  }, [id]);

  function renderMap() {
    return (
      itinerary.geoJson !== "" && (
        <MapComponent
          data={JSON.parse(itinerary.geoJson)}
          zoom={13}
          center={calculateCenter(
            JSON.parse(itinerary.geoJson).metadata.query.coordinates[0]
          )}
        />
      )
    );
  }

  return error ? (
    <ErrorPage />
  ) : (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
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
              {Math.round(itinerary.timeToVisit / 60)} minuti (automobile)
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Km percorrenza totale
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.geoJson !== "" &&
                mToKmRounded(
                  JSON.parse(itinerary.geoJson).features[0].properties.summary
                    .distance
                )}{" "}
              km
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Categorie</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {itinerary.categories.map((category) => {
                return <li key={category.name}> {category.name}</li>;
              })}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Istruzioni</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {itinerary.geoJson !== "" && <InstructionsComponent geojson={JSON.parse(itinerary.geoJson)} />}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Mappa</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {renderMap()}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

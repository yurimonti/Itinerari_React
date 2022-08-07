/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "../pages/ErrorPage";
import { printArray } from "../utils/utilFunctions";
import MapComponent from "./map-components/MapComponent";

const initialData = {
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
        let data = res.data;
        data === initialData ? setError(true) : setItinerary(data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getDataById();
    return () => {
      setItinerary(initialData);
      setError(false);
    };
  }, [id]);

  function renderMap() {
    return (
      itinerary.geoJson !== "" && (
        <MapComponent data={JSON.parse(itinerary.geoJson)} zoom={12} />
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
              Inserire Nome
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Città</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {printArray(itinerary.cities.map((c) => c.name))}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Punti di visita
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {printArray(itinerary.points.map((p) => p.name))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tempo di visita totale
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {Math.round(itinerary.timeToVisit / 60)} minuti
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Categorie</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {printArray(itinerary.categories.map((c) => c.name))}
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

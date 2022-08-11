import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "./ErrorPage";
import { printArray, renderHours } from "../utils/utilFunctions";
import { renderhours } from "../utils/utilFunctions.js";

const initialPoiData = {
  id: 0,
  name: "",
  description: "",
  coordinate: {},
  hours: {},
  timeToVisit: 0.0,
  ticketPrice: 0.0,
  types: [],
  address: {},
  link: {},
  contact: {},
  tagValues: [],
  contributors: [],
};
const initialCityData = {
  id: 0,
  name: "",
};

export default function PoiDescriptionPage() {
  //TODO:completare

  const { id } = useParams();
  const [poi, setPoi] = useState(initialPoiData);
  const [city, setCity] = useState(initialCityData);
  const [error, setError] = useState(false);

  function getDataById() {
    publicInstance
      .get("/api/poi", {
        params: { id: id },
      })
      .then((res) => {
        const data = { poi: res.data.poi, city: res.data.city };
        data.poi.name === "" ? setError(true) : setPoi(data.poi);
        data.city.name === "" ? setError(true) : setCity(data.city);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    getDataById();
    return () => {
      setPoi(initialPoiData);
    };
  }, [id]);

  return error ? (
    <ErrorPage />
  ) : (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nome</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Descrizione</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi?.description}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Città</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {city?.name}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Coordinate</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                <li>Latitudine: {poi?.coordinate?.lat}</li>
                <li> Longitudine: {poi?.coordinate?.lon} </li>
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Costo Ticket</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi.ticketPrice}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Orari</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {/* //TODO:inserire orari */}
              <p className="mb-3">Oggi è {poi?.hours?.open ? "Aperto" : "Chiuso"}</p>
              {poi.hours.monday && (
                <p>Lunedì: {renderHours(poi.hours.monday)}</p>
              )}
              {poi.hours.tuesday && (
                <p>Martedì: {renderHours(poi.hours.tuesday)}</p>
              )}
              {poi.hours.wednesday && (
                <p>Mercoledì: {renderHours(poi.hours.wednesday)}</p>
              )}
              {poi.hours.thursday && (
                <p>Giovedì: {renderHours(poi.hours.thursday)}</p>
              )}
              {poi.hours.friday && (
                <p>Venerdì: {renderHours(poi.hours.friday)}</p>
              )}
              {poi.hours.saturday && (
                <p>Sabato: {renderHours(poi.hours.saturday)}</p>
              )}
              {poi.hours.sunday && (
                <p>Domenica: {renderHours(poi.hours.sunday)}</p>
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Indirizzo</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi?.address?.street}, {poi?.address?.number}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Contatti</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul>
                <li>Email: {poi?.contact?.email}</li>
                <li>Tel: {poi?.contact?.cellNumber}</li>
                <li>Fax: {poi?.contact?.fax}</li>
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Contributori</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi?.contributors.length === 0
                ? "..."
                : poi?.contributors.map((c) => {
                    return <li> {c}</li>;
                  })}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tipi di Poi</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {printArray(poi.types.map((t) => t.name))}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Tags</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi.tagValues.map((tv) => {
                return (
                  <li key={tv.id}>
                    {" "}
                    {tv.tag.name} :{" "}
                    {tv.tag.isBooleanType
                      ? tv?.booleanValue?.toString()
                      : tv?.stringValue?.toString()}
                  </li>
                );
              })}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">
              Tempo di visita
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {poi.timeToVisit} minuti
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

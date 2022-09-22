import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "./ErrorPage";
import { printArray, renderHours } from "../utils/utilFunctions";
import { useUserContext } from "../utils/UserInfoProvider";
import LoadingComponent from "../components/LoadingComponent";
import MyAlert from "../components/MyAlert";

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

export default function PoiDescriptionPage({ role }) {
  const { id } = useParams();
  const [poi, setPoi] = useState(initialPoiData);
  const [city, setCity] = useState(initialCityData);
  const [error, setError] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState({});

  function getDataById() {
    
    state.poi
      ? publicInstance
          .get("/api/poi", {
            params: { id: id },
          })
          .then((res) => {
            setIsLoading(true);
            const data = { poi: res.data.poi, city: res.data.city };
            data.poi.name === "" ? setError(true) : setPoi(data.poi);
            data.city.name === "" ? setError(true) : setCity(data.city);
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          })
      : publicInstance
          .get("/api/request", {
            params: { id: id },
          })
          .then((res) => {
            const data = { poi: res.data, city: res.data.city };
            data.poi.name === "" ? setError(true) : setPoi(data.poi);
            data.city.name === "" ? setError(true) : setCity(data.city);
          })
          .then(() => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
  }
  useEffect(() => {
    getDataById();
    return () => {
      setPoi(initialPoiData);
    };
  }, [id, role]);

  function deletePoi() {
    setIsLoading(true);
    publicInstance
      .delete("/api/ente/poi", {
        params: { username: username, id: poi.id },
      })
      .then((res) => {
        setMessages({
          title: "SUCCESSO",
          content: "POI Eliminato Correttamente",
          result: "OK",
        });
        console.log(res);
      })
      .then(() => {
        setIsLoading(false);
        setOpen(true);
      })
      .catch((err) => {
        let content = "";
        err.response.status === 400
          ? (content ="Esistono itinerari con questo POI: elimina gli itinerari che lo contengono")
          : (content = "Non è possibile eliminare il POI");
        setMessages({ title: "Errore nell'eliminazione Poi", content: content, result: "Indietro" });
        setIsLoading(false);
        setOpen(true);
      })
  }

  return error ? (
    <ErrorPage />
  ) : (
    <>
    {/*before had also flex */}
      <div className="flex justify-center m-auto align-center">
        {role === "ente" && (
          <>
            <button
              type="button"
              className="text-md font-sans p-2 flex float-left ml-3 border-2 rounded-md border-red-400 transition ease-in-out shadow-red-200 shadow-md hover:shadow-lg hover:shadow-red-300 delay-10 duration-400  hover:bg-red-400 mb-4 "
              onClick={deletePoi}
            >
              Elimina Poi
            </button>
            <MyAlert
              trigger={open}
              close={() => {
                setOpen(false);
                navigate("/map");
              }}
              messages={messages}
            />
          </>
        )}
        {state.poi && (
          <button
            type="button"
            className="text-md font-sans p-2 flex float-left ml-3 border-2 rounded-md border-sky-400 transition ease-in-out shadow-sky-200 shadow-md hover:shadow-lg hover:shadow-sky-300 delay-10 duration-400  hover:bg-sky-400 mb-4 "
            onClick={() => {
              state.poi &&
                navigate("/poi-form/poi/" + poi.id, { state: { poi: true } });
            }}
          >
            Modifica Poi
          </button>
        )}
      </div>
      <div className="bg-white clear-both shadow overflow-hidden sm:rounded-lg">
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Nome</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {poi?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Descrizione</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {poi?.description}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Città</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {city?.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="tfont-sans text-gray-500">Coordinate</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li>Latitudine: {poi?.coordinate?.lat}</li>
                  <li> Longitudine: {poi?.coordinate?.lon} </li>
                </ul>
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">
                Costo Ticket
              </dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {poi.ticketPrice}€
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Orari</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                <p className={poi?.hours?.open ?"mb-3 text-green-700" : "mb-3 text-red-600"}>
                  Adesso è {poi?.hours?.open ? "Aperto" : "Chiuso"}
                </p>
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
              <dt className="font-sans text-gray-500">Indirizzo</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {poi?.address?.street}, {poi?.address?.number}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Contatti</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                <ul>
                  <li>Email: {poi?.contact?.email}</li>
                  <li>Tel: {poi?.contact?.cellNumber}</li>
                  <li>Fax: {poi?.contact?.fax}</li>
                </ul>
              </dd>
            </div>
            {state.poi ? (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-sans text-gray-500">
                  Contributori
                </dt>
                <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                  {poi?.contributors.length === 0
                    ? "..."
                    : poi?.contributors.map((c) => {
                        return <li> {c}</li>;
                      })}
                </dd>
              </div>
            ) : (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="font-sans text-gray-500">Creata da</dt>
                <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                  {poi?.username}
                </dd>
              </div>
            )}
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Tipo di Poi</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {printArray(poi.types.map((t) => t.name))}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="font-sans text-gray-500">Tags</dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
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
              <dt className="font-sans text-gray-500">
                Tempo di visita
              </dt>
              <dd className="mt-1 font-sans text-gray-900 sm:mt-0 sm:col-span-2">
                {poi.timeToVisit} minuti
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <LoadingComponent
        onClose={() => {
          setIsLoading(false);
        }}
        isLoading={isLoading}
      />
    </>
  );
}

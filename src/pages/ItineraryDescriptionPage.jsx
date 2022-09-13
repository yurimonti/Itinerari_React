import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import ErrorPage from "./ErrorPage";
import { printArray, mToKmRounded } from "../utils/utilFunctions";
import MapComponent from "../components/map-components/MapComponent";
import { calculateCenter } from "../utils/map-utils/coordsManager";
import { Listbox } from "@headlessui/react";
import {
  SelectorIcon,
  PaperClipIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import InstructionsComponent from "../components/itinerary-components/InstructionsComponent";
import LoadingComponent from "../components/LoadingComponent";
import CarIcon from "../components/CarIcon";
import WheelChairIcon from "../components/WheelChairIcon";
import CyclingElectricIcon from "../components/CyclingElectricIcon";
import WalkingIcon from "../components/WalkingIcon";
import "../styles/listStyle.css";
import {
  DocumentDownloadIcon,
  BookOpenIcon,
  LibraryIcon,
  SunIcon,
  TruckIcon,
} from "@heroicons/react/outline";

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
  const [isLoading, setIsLoading] = useState(false);
  const [buttons, setButtons] = useState([true, false, false, false]);

  const setIconToCategory = (category) => {
    const iconStyle = "h-7 w-7 text-indigo-600 mx-2 inline";
    let result;
    switch (category) {
      case "Culturale":
        result =<BookOpenIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "Architetturale":
        result = <LibraryIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "Naturalistica":
        result = <SunIcon className={iconStyle} aria-hidden="true" />;
        break;
      case "ZonaParcheggio":
        result = <TruckIcon className={iconStyle} aria-hidden="true" />;
        break;
      default:
        result = "";
    }
    return result;
  };

  const renderButton = () => {
    let disabled = [];
    geoJsonSelect.map((g) => g.name).includes("driving-car")
      ? disabled.push(false)
      : true;
    geoJsonSelect.map((g) => g.name).includes("wheelchair")
      ? disabled.push(false)
      : true;
    geoJsonSelect.map((g) => g.name).includes("cycling-electric")
      ? disabled.push(false)
      : true;
    geoJsonSelect.map((g) => g.name).includes("foot-walking")
      ? disabled.push(false)
      : true;
    return disabled;
  };

  function getDataById() {
    let url = state?.isRequest ? "/api/itinerary-request" : "/api/itinerary";
    setIsLoading(true);
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
        setIsLoading(false);
        setError(true);
        console.log(err);
      });
  }
  useEffect(() => {
    getDataById();
    setIsLoading(false);
    setButtons([true, false, false, false]);
    return () => {
      setItinerary(initialData);
      setGeoJsonSelect([]);
      setCurrentGeoJson({});
      setButtons([true, false, false, false]);
    };
  }, [id]);

  function mapButton() {
    const style =
      "rounded-xl pl-2 py-1 bg-white sm:hover:border-indigo-600 border-indigo-400 flex border-4 mx-auto mt-auto mb-3";
    const iconStyle = "h-6 w-6 text-indigo-600 mx-2";
    const onClick = () => {
      setClick((prev) => {
        return !prev;
      });
    };
    return click ? (
      <button type="button" className={style} onClick={onClick}>
        Nascondi Mappa{" "}
        <ChevronUpIcon className={iconStyle} aria-hidden="true" />
      </button>
    ) : (
      <button
        type="button"
        className={style}
        onClick={() => {
          setClick((prev) => {
            return !prev;
          });
        }}
      >
        Visualizza Percorso{" "}
        <ChevronDownIcon className={iconStyle} aria-hidden="true" />
      </button>
    );
  }

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
    <>
      <div className="m-auto w-fit mb-2">
        <button
          type="button"
          disabled={renderButton[0]}
          className={
            buttons[0]
              ? "m-1 rounded-full border-4  border-indigo-600"
              : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 sm:hover:shadow-xl sm:hover:border-indigo-600 sm:hover:shadow-indigo-500 duration-800"
          }
          onClick={() => {
            if (!buttons[0]) {
              setButtons([true, false, false, false]);
              if (!renderButton[0]) {
                let toSet = geoJsonSelect.filter(
                  (g) => g.name === "driving-car"
                )[0];
                setCurrentGeoJson(toSet);
              }
            }
            setClick(false);
          }}
        >
          <CarIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="24" />
        </button>
        <button
          type="button"
          disabled={renderButton[1]}
          className={
            buttons[1]
              ? "m-1 rounded-full border-4  border-indigo-600"
              : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
          }
          onClick={() => {
            if (!buttons[1]) {
              setButtons([false, true, false, false]);
              if (!renderButton[1]) {
                let toSet = geoJsonSelect.filter(
                  (g) => g.name === "wheelchair"
                )[0];
                setCurrentGeoJson(toSet);
              }
            }
            setClick(false);
          }}
        >
          <WheelChairIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
        </button>
        <button
          type="button"
          disabled={renderButton[2]}
          className={
            buttons[2]
              ? "m-1 rounded-full border-4  border-indigo-600"
              : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
          }
          onClick={() => {
            if (!buttons[2]) {
              setButtons([false, false, true, false]);
              if (!renderButton[2]) {
                let toSet = geoJsonSelect.filter(
                  (g) => g.name === "cycling-electric"
                )[0];
                setCurrentGeoJson(toSet);
              }
            }
            setClick(false);
          }}
        >
          <CyclingElectricIcon
            /*color="#4F46E5"*/ color="#4F46E5"
            thickness="22"
          />
        </button>
        <button
          type="button"
          disabled={renderButton[3]}
          className={
            buttons[3]
              ? "m-1 rounded-full border-4  border-indigo-600"
              : "m-1 rounded-full border-4  border-indigo-200 transition ease-in-out delay-10 hover:shadow-xl hover:border-indigo-600 hover:shadow-indigo-500 duration-250"
          }
          onClick={() => {
            if (!buttons[3]) {
              setButtons([false, false, false, true]);
              if (!renderButton[3]) {
                let toSet = geoJsonSelect.filter(
                  (g) => g.name === "foot-walking"
                )[0];
                setCurrentGeoJson(toSet);
              }
            }
            setClick(false);
          }}
        >
          <WalkingIcon /*color="#4F46E5"*/ color="#4F46E5" thickness="16" />
        </button>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="border-t border-gray-200">
          <dl>
            {/* <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
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
          </div> */}
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
                <ol>
                  {itinerary.points.map((point) => {
                    return <li key={point.poi.id}> {point.poi.name}</li>;
                  })}
                </ol>
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
                  <ul>
                    {itinerary.categories.map((category) => {
                      return (
                        <li key={category.name}>
                          {" "}
                          {setIconToCategory(category.name)}
                          {category.name}
                        </li>
                      );
                    })}
                  </ul>
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
                {mapButton()}
                {renderMap()}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Scarica Percorso
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex w-full flex-1 items-center">
                <PaperClipIcon
                  className="w-5 h-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                {itinerary?.name}_{currentGeoJson?.name}.pdf
                <div className="ml-4 flex-shrink-0">
                  <button type="button">
                    <DocumentDownloadIcon
                      className="h-6 w-6 flex-shrink-0 text-indigo-600 hover:text-indigo-800"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <LoadingComponent
          onClose={() => {
            setIsLoading(false);
          }}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

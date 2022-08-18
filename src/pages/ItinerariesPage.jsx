import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import SelectComponent from "../components/SelectComponent";
import { mToKmRounded } from "../utils/utilFunctions.js";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import ItineraryCard from "../components/ItineraryCard";

const ItinerariesPage = ({ role }) => {
  const [itineraries, setItineraries] = useState([]);
  const [itinerariesFiltered, setItinerariesFiltered] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ name: "" });
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const params = (owned) => {
    if (role === "user") {
      if (owned) return { username: "an_user" };
      else return { username: "an_user", cityId: selectedCity.id };
    } else return { username: "ente_camerino" };
  };

  const returnThen = (owned, data) => {
    if (role === "user") {
      if (owned) return setItineraries(data);
      else return setItinerariesFiltered(data);
    } else return setItineraries(data);
  };
  //const location = useLocation();

  function getItineraries(owned) {
    let baseUrl =
      role === "user" && owned
        ? "/api/" + role + "/itinerary/owner"
        : "/api/" + role + "/itinerary";
    publicInstance
      .get(baseUrl, {
        params: params(owned),
      })
      .then((res) => {
        returnThen(owned, res.data);
      })
      .catch((err) => console.log(err));
  }

  function fetchCities() {
    publicInstance
      .get("/api/city/all")
      .then((res) => setCities(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getItineraries(true);
    if (role === "user") fetchCities();
    return () => {
      setItineraries([]);
    };
  }, [role]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {role === "user" ? "I miei Itinerari" : "Itinerari"}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {itineraries.map((itinerary) => (
            <ItineraryCard
              itinerary={itinerary}
              key={itinerary.id}
              onClick={() => {
                navigate("./" + itinerary.id);
              }}
            />
          ))}
        </div>
        {role === "user" && (
          <>
            <h2 className=" mt-5 text-2xl font-extrabold tracking-tight text-gray-900">
              Itinerari Predefiniti
            </h2>
            <div className="mt-5 justify-left">
              <SelectComponent
                values={cities}
                selected={selectedCity}
                setSelected={setSelectedCity}
              />
              <button
                type="button"
                onClick={() => {
                  selectedCity.name !== "" && getItineraries(false);
                }}
                className="bg-green-300"
              >
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setItinerariesFiltered([]);
                  setSelectedCity({ name: "" });
                }}
                className="bg-red-400"
              >
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {itinerariesFiltered.map((itinerary) => (
                <ItineraryCard
                  itinerary={itinerary}
                  key={itinerary.id}
                  onClick={() => {
                    navigate("./" + itinerary.id);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItinerariesPage;

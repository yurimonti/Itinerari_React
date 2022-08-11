import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import { printArray, mToKmRounded } from "../utils/utilFunctions.js";

const ItinerariesComponent = ({ role }) => {
  const [itineraries, setItineraries] = useState([]);
  const [selectedCity, setSelectedCity] = useState({ id: 0, name: "" });
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const params = (owned)=>{
    if(role === "user"){
      if(owned) return { username: "an_user"}
      else return { username: "an_user", cityId: selectedCity.id }
    } else return { username: "ente_camerino" };
  }
  //const location = useLocation();

  function getItineraries(owned) {
    let baseUrl = (role==="user" && owned)? "/api/" + role + "/itinerary/owner" :"/api/" + role + "/itinerary";
    publicInstance
      .get(baseUrl, {
        params: params(owned),
      })
      .then((res) => {
        setItineraries(res.data);
      })
      .catch((err) => console.log(err));
  }

  function fetchCities() {
    publicInstance
      .get("/api/city/all")
      .then((res) => console.log(res.data))
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
          Itinerari
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {itineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="group relative p-2 border-4 rounded-md border-gray-300 hover:border-blue-400"
            >
              <h2 className="text-md text-center text-gray-700">
                <a
                  className="text-"
                  onClick={() => {
                    navigate("./" + itinerary.id);
                  }}
                >
                  <span aria-hidden="true" className="absolute inset-0" />
                  {itinerary.name === null ? "Itinerario" : itinerary?.name}
                </a>
              </h2>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm">
                    Città:
                    <p className="mt-1 text-sm text-gray-500">
                      {/* FIXME: vedere perche non funziona */}
                      {itinerary.cities.map((c) => {
                        return <li key={c.name}>{c.name}</li>;
                      })}
                    </p>
                  </h3>
                  <h3 className="text-sm">
                    Categorie:
                    <p className="mt-1 text-sm text-gray-500">
                      {/* FIXME: vedere perche non funziona */}
                      {itinerary.categories.map((c) => {
                        return <li key={c.name}>{c.name}</li>;
                      })}
                    </p>
                  </h3>
                </div>
                <div>
                  <h3 className="text-sm">
                    Durata:{" "}
                    <p className="text-sm font-medium text-gray-900">
                      {Math.round(itinerary.timeToVisit / 60)} minuti
                    </p>
                  </h3>
                  <h3 className="text-sm">
                    Distanza:
                    <p className="text-sm font-medium text-gray-900">
                      {mToKmRounded(
                        JSON.parse(itinerary.geoJson).features[0].properties
                          .summary.distance
                      )}{" "}
                      km
                    </p>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItinerariesComponent;

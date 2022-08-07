import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicInstance } from "../api/axiosInstance";
import {printArray} from "../utils/utilFunctions.js";

const ItinerariesComponent = ({ role }) => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();
  //const location = useLocation();

  function getItineraries() {
    let baseUrl = "/api/" + role + "/itinerary";
    let params =
      role === "user"
        ? { username: "an_user", cityId: 107/*location?.state?.cityId*/ }
        : { username: "ente_camerino" };
    publicInstance
      .get(baseUrl, {
        params: params,
      })
      .then((res) => {
        setItineraries(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getItineraries();
    return () => {
      setItineraries([]);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Itinerari
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {itineraries.map((itinerary) => (
            <div key={itinerary.id} className="group relative">
              {/* <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={itinerary.imageSrc}
                  alt={itinerary.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div> */}
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a onClick={()=>{
                      navigate("./"+itinerary.id);
                    }}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {itinerary?.id}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                  {/* FIXME: vedere perche non funziona */}
                    {/* {printArray(itinerary.categories.map(c => c.name))} */}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {itinerary.timeToVisit}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItinerariesComponent;

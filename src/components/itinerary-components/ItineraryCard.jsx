import { useState } from "react";
import { mToKmRounded } from "../../utils/utilFunctions.js";
import ModalComponent from "../ModalComponent.jsx";
import { useUserContext } from "../../utils/UserInfoProvider";
import { publicInstance } from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";

//Component for an Itinerary Card
function ItineraryCard({ itinerary, reload, withModal }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { role, username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * delete an itinerary from server
   */
  function deleteItinerary() {
    setIsLoading(true);
    let url = role === "ente" ? "/api/ente/itinerary" : "/api/user/itinerary";
    let params = { itineraryId: itinerary.id, username: username };
    /* role === "ente"
        ? { itineraryId: itinerary.id, username: username }
        : { itineraryId: itinerary.id, username: username }; */
    publicInstance
      .delete(url, {
        params: params,
      })
      .then((res) => {
        console.log(res.status);
      })
      .then(() => {
        setIsLoading(false);
        reload((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.log(err.status);
        setIsLoading(false);
      });
  }

  /**
   * create an itinerary request
   */
  function createRequestItinerary() {
    publicInstance
      .post("api/user/itinerary/owner", null, {
        params: { username: username, id: itinerary.id },
      })
      .then((res) => {
        setIsLoading(true);
        console.log(res);
      })
      .then(() => {
        setIsLoading(false);
        reload((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div
      key={itinerary.id}
      className="group relative p-2 border-4 rounded-md border-gray-300 hover:border-blue-400"
    >
      <h2 className="text-md text-center text-gray-700">
        <a
          className="text-"
          onClick={() => {
            withModal ? setOpen(true) : navigate("./" + itinerary.id);
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
              {itinerary.cities.map((c) => {
                return <li key={c.name}>{c.name}</li>;
              })}
            </p>
          </h3>
          <h3 className="text-sm">
            Categorie:
            <p className="mt-1 text-sm text-gray-500">
              {itinerary.categories.map((c) => {
                return <li key={c.name}>{c.name}</li>;
              })}
            </p>
          </h3>
        </div>
        <div>
          <h3 className="text-sm">
            Durata:{" "}
            {itinerary.geoJsonList.length !== 0 && (
              <p className="text-sm font-medium text-gray-900">
                {Math.round(
                  (itinerary.timeToVisit +
                    JSON.parse(itinerary.geoJsonList[0]).features[0].properties
                      .summary.duration) /
                    60
                )}{" "}
                minuti
              </p>
            )}
          </h3>
          <h3 className="text-sm">
            Distanza:
            {itinerary.geoJsonList.length !== 0 && (
              <p className="text-sm font-medium text-gray-900">
                {mToKmRounded(
                  JSON.parse(itinerary.geoJsonList[0]).features[0].properties
                    .summary.distance
                )}{" "}
                km
              </p>
            )}
          </h3>
        </div>
      </div>
      {withModal && (
        <ModalComponent
          key={itinerary.id}
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          accept={
            role === "user"
              ? {
                  title: "proponi itinerario",
                  action: () => {
                    createRequestItinerary();
                  },
                }
              : undefined
          }
          deny={
            role === "ente" || !itinerary.isDefault
              ? {
                  title: "elimina itinerario",
                  action: () => {
                    deleteItinerary();
                    setOpen(false);
                  },
                }
              : undefined
          }
          title={itinerary.name}
          modify={{
            title: "vedi info",
            action: () => {
              navigate("./" + itinerary.id);
            },
          }}
        >
          <h2 className="text-lg">Che cosa vuoi fare?</h2>
        </ModalComponent>
      )}
      <LoadingComponent
        isLoading={isLoading}
        onClose={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

export default ItineraryCard;

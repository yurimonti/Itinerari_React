import { useState } from "react";
import { mToKmRounded } from "../../utils/utilFunctions.js";
import ModalComponent from "../ModalComponent.jsx";
import { useUserContext } from "../../utils/UserInfoProvider";
import { publicInstance } from "../../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../LoadingComponent";
import MyAlert from "../MyAlert.jsx";

//Component for an Itinerary Card
function ItineraryCard({ itinerary, reload, withModal }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { role, username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState({ result: "Indietro" });

  /**
   * delete an itinerary from server
   */
  function deleteItinerary() {
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
        setIsLoading(true);
        console.log(res.status);
      })
      .then(() => {
        setIsLoading(false);
        reload((prev) => {
          return !prev;
        });
      })
      .catch((err) => {
        setMessages((pre) => {
          let result = {
            ...pre,
            title: "Impossibile eliminare itinerario",
            content:"Si è verificato un errore durante l'eliminazione dell'itinerario",
          };
          return result;
        });
        console.log(err.status);
        setIsLoading(false);
        setIsOpen(true);
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
        setMessages((pre) => {
          let result = {
            ...pre,
            title: "Impossibile creare una richiesta itinerario",
            content: "Si è verificato un errore durante la richiesta",
          };
          return result;
        });
        console.log(err);
        setIsLoading(false);
        setIsOpen(true);
      });
  }

  return (
    <div
      key={itinerary.id}
      className="min-w-fit group bg-white relative p-2 border-4 rounded-xl border-blue-400 hover:border-blue-500 focus:border-blue-500 shadow-blue-300 shadow-md transition ease-in-out delay-10 duration-400 hover:shadow-lg hover:shadow-blue-300"
    >
      <h2 className="text-center text-lg leading-8 text-gray-900">
        <a
          className="font-sans tracking-tighter"
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
          <h3 className="text-sm font-sans">
            Città:
            <p className="mt-1 text-gray-500">
              {itinerary.cities.map((c) => {
                return <li key={c.name}>{c.name}</li>;
              })}
            </p>
          </h3>
          <h3 className="text-sm font-sans">
            Categorie:
            <p className="mt-1 text-gray-500">
              {itinerary.categories.map((c) => {
                return <li key={c.name}>{c.name}</li>;
              })}
            </p>
          </h3>
        </div>
        <div>
          <h3 className="text-sm font-sans">
            Durata:{" "}
            {itinerary.geoJsonList.length !== 0 && (
              <p className="text-gray-500">
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
          <h3 className="text-sm font-sans">
            Distanza:
            {itinerary.geoJsonList.length !== 0 && (
              <p className="text-gray-500">
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
          <h2 className="text-lg font-sans text-gray-900">Che cosa vuoi fare?</h2>
        </ModalComponent>
      )}
      <MyAlert close={()=>{setIsOpen(false)}} messages={messages} trigger={isOpen} />
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

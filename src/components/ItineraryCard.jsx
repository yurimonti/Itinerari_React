import { useState } from "react";
import { mToKmRounded } from "../utils/utilFunctions.js";
import ModalComponent from "./ente-components/ModalComponent.jsx";
import { useMyContext } from "../utils/MyProvider.jsx";
import { publicInstance } from "../api/axiosInstance.js";
import { useNavigate } from "react-router-dom";

function ItineraryCard({ itinerary, reload }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const role = useMyContext();

  function deleteItinerary() {
    let url = role === "ente" ? "/api/ente/itinerary" : "/api/user/itinerary";
    let params = role === "ente" ? { itineraryId: itinerary.id, username: "ente_camerino" }:{ itineraryId: itinerary.id, username: "an_user" }
    publicInstance
      .delete(url, {
        params: params,
      })
      .then((res) => {
        console.log(res.status);
        reload((prev) => {
          return !prev;
        });
      })
      .catch((err) => console.log(err.status));
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
            setOpen(true);
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
      <ModalComponent
        key={itinerary.id}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        deny={(role ==="ente" || !itinerary.isDefault) ? () => {
          deleteItinerary();
          setOpen(false);
        }: undefined}
        role="ente"
        title={itinerary.name}
        modify={() => {
          navigate("./" + itinerary.id);
        }}
      >
        <p>{itinerary.description}</p>
      </ModalComponent>
    </div>
  );
}

export default ItineraryCard;

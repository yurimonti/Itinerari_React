import React from "react";
import { mToKmRounded } from "../utils/utilFunctions.js";

function ItineraryCard({ itinerary, onClick }) {
  return (
    <div
      key={itinerary.id}
      className="group relative p-2 border-4 rounded-md border-gray-300 hover:border-blue-400"
    >
      <h2 className="text-md text-center text-gray-700">
        <a className="text-" onClick={onClick}>
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
            {itinerary.geoJsonList.length !== 0 && <p className="text-sm font-medium text-gray-900">
              {mToKmRounded(
                JSON.parse(itinerary.geoJsonList[0]).features[0].properties
                  .summary.distance
              )}{" "}
              km
            </p>}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ItineraryCard;

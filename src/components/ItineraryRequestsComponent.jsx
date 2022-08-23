import React, { useState, useEffect } from "react";
import { publicInstance } from "../api/axiosInstance";
import ItineraryRequestCard from "./ItineraryRequestCard";

function ItineraryRequestsComponent({ reload }) {
  const [requests, setRequests] = useState([]);

  function getItineraryRequests() {
    publicInstance
      .get("/api/ente/itinerary/requests", {
        params: { username: "ente_camerino" },
      })
      .then((res) => setRequests(res.data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getItineraryRequests();
    return () => {
      setRequests([]);
    };
  }, [reload.dependency]);

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Richieste Itinerari
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {requests.map((request) => {
          return <ItineraryRequestCard key={request.id} request={request} reload={reload}/>;
        })}
      </div>
    </>
  );
}

export default ItineraryRequestsComponent;

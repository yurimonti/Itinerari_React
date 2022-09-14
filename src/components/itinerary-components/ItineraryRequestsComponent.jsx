import { useState, useEffect } from "react";
import { publicInstance } from "../../api/axiosInstance";
import ItineraryRequestCard from "./ItineraryRequestCard";
import { useUserContext } from "../../utils/UserInfoProvider";
import LoadingComponent from "../LoadingComponent";
// Component of itinerary request section
function ItineraryRequestsComponent({ reload }) {
  const [requests, setRequests] = useState([]);
  const { username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * get itinerary requests from server
   */
  function getItineraryRequests() {
    publicInstance
      .get("/api/ente/itinerary/requests", {
        params: { username: username },
      })
      .then((res) => {
        setIsLoading(true);
        setRequests(res.data);
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
    getItineraryRequests();
    return () => {
      setRequests([]);
    };
  }, [reload.dependency]);

  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-wide text-gray-900">
        Richieste Itinerari
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {requests.map((request) => {
          return (
            <ItineraryRequestCard
              key={request.id}
              request={request}
              reload={reload}
            />
          );
        })}
      </div>
      <LoadingComponent
        isLoading={isLoading}
        onClose={() => {
          setIsLoading(false);
        }}
      />
    </>
  );
}

export default ItineraryRequestsComponent;

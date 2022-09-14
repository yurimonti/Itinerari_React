import { useEffect, useState } from "react";
import { publicInstance } from "../../api/axiosInstance";
import PoiRequestCard from "./PoiRequestCard";
import { useUserContext } from "../../utils/UserInfoProvider";
import LoadingComponent from "../LoadingComponent";

//Component that renders all requests
export default function NotifiesComponent({ role }) {
  const [requests, setRequests] = useState([]);
  const [clicked, setClicked] = useState(false);
  const { username } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * get all request from server
   */
  function getAllNotifies() {
    setIsLoading(true);
    if (role === "ente") {
      publicInstance
        .get("/api/ente/notifies", {
          params: { username: username },
        })
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      publicInstance
        .get("/api/user/notifies", {
          params: { username: username },
        })
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getAllNotifies();
    setIsLoading(false);
    return () => {
      setRequests([]);
    };
  }, [clicked, role]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-wide text-gray-900">
          Richieste
        </h2>
        {/* card container */}
        {requests.length === 0 ? (
          <h3 className="flex justify-center m-auto">Nessuna Richiesta</h3>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* card content */}
            {requests.map((request) => {
              return (
                <PoiRequestCard
                  key={request.id}
                  request={request}
                  reload={setClicked}
                  role={role}
                />
              );
            })}
          </div>
        )}
      </div>
      <LoadingComponent
        isLoading={isLoading}
        onClose={() => {
          setIsLoading(false);
        }}
      />
    </div>
  );
}

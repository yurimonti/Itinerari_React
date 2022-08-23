import { useEffect, useState } from "react";
import { publicInstance } from "../api/axiosInstance";
import { useMyContext } from "../utils/MyProvider";
import PoiRequestCard from "./PoiRequestCard";

export default function NotifiesComponent({ role }) {
  const [requests, setRequests] = useState([]);
  const [clicked, setClicked] = useState(false);

  function getAllNotifies() {
    if (role === "ente") {
      publicInstance
        .get("/api/ente/notifies", {
          params: { username: "ente_camerino" },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.log(err));
    } //TODO:mettere mettodo per user
    else {
      publicInstance
        .get("/api/user/notifies", {
          params: { username: "an_user" },
        })
        .then((res) => setRequests(res.data))
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    getAllNotifies();
    return () => {
      setRequests([]);
    };
  }, [clicked, role]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Richieste
        </h2>
        {/* card container */}
        {requests.length === 0 ? (
          <h3 className="flex justify-center m-auto">Nessuna Richiesta</h3>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* card content */}
            {requests.map((request) => {
              return <PoiRequestCard request={request} reload={setClicked} role={role} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
